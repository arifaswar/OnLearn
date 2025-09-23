import getDistance from "../helpers/getDistance.js";
import Booking from "../models/Booking.js";
import Schedule from "../models/Schedule.js";
import Teacher from "../models/Teacher.js";

class BookingController {
  static async searchTeacher(req, res) {
    try {
      const { subject, day, lat, lng, maxDistance } = req.query;
        console.log(req.query);
        
      // cari guru sesuai subject
      let query = {};
      if (subject) query.subject = { $in: [subject] };

      const teachers = await Teacher.find(query);

      let results = [];
      for (let teacher of teachers) {
        // cek jarak (jika lat lng dikirim)
        if (lat && lng && teacher.location?.coordinates) {
          const distance = getDistance(
            parseFloat(lat),
            parseFloat(lng),
            teacher.location.coordinates.lat,
            teacher.location.coordinates.lng
          );
          if (maxDistance && distance > maxDistance) continue; // skip kalau terlalu jauh
          teacher = teacher.toObject();
          teacher.distance = distance.toFixed(2);
        }

        // ambil schedule guru + filter slot sesuai hari
        const schedules = await Schedule.find({ teacher: teacher._id });
        let availableSlots = [];
        for (let schedule of schedules) {
          const slots = schedule.slots.filter(
            (slot) =>
              slot.status === "available" &&
              (!day || slot.day.toLowerCase() === day.toLowerCase())
          );
          if (slots.length) {
            availableSlots.push({ scheduleId: schedule._id, slots });
          }
        }

        if (availableSlots.length) {
          results.push({ teacher, availableSlots });
        }
      }

      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //booking slot guru

  static async bookSlot(req, res) {
    try {
        console.log(req.student);
      const studentId = req.student.id;
       // siswa login
      const { teacherId, scheduleId, slotId, mode } = req.body;

      // cek guru
      const teacher = await Teacher.findById(teacherId);
      if (!teacher)
        return res.status(404).json({ message: "Teacher not found" });

      // cek schedule
      const schedule = await Schedule.findOne({
        _id: scheduleId,
        teacher: teacherId,
      });
      if (!schedule)
        return res.status(404).json({ message: "Schedule not found" });

      // cek slot
      const slot = schedule.slots.find((schedule) => schedule.slotId === slotId);
      if (!slot || slot.status !== "available") {
        return res.status(400).json({ message: "Slot not available" });
      }

      // hitung harga
      const amount =
        mode === "offline" ? teacher.priceOffline : teacher.priceOnline;
      const adminFee = amount * 0.1; // contoh 10% fee
      const teacherAmount = amount - adminFee;

      // buat booking
      const newBooking = await Booking.create({
        student: studentId,
        teacher: teacherId,
        schedule: scheduleId,
        slotId,
        mode,
        amount,
        adminFee,
        teacherAmount,
      });
      // update slot jadi occupied
      slot.status = "occupied";
      await schedule.save();

      // ==== Integrasi Midtrans Snap ====
      let snap = new midtransClient.Snap({
        isProduction: false, // ubah true jika production
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const parameter = {
        transaction_details: {
          order_id: "BOOK-" + newBooking._id,
          gross_amount: amount,
        },
        customer_details: {
          first_name: req.student.name || "Student",
          email: req.student.email || "student@example.com",
        },
        item_details: [
          {
            id: slotId,
            price: amount,
            quantity: 1,
            name: `${teacher.name} - ${mode} class`,
          },
        ],
      };

      const transaction = await snap.createTransaction(parameter);

      // kirim link/token ke frontend
      res.status(201).json({
        message: "Booking created, waiting for payment",
        booking: newBooking,
        redirect_url: transaction.redirect_url,
        token: transaction.token,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // webhook notifikasi dari Midtrans
  static async handleNotification(req, res) {
    try {
      const notification = req.body;
      const orderId = notification.order_id; // BOOK-<bookingId>
      const transactionStatus = notification.transaction_status;

      const bookingId = orderId.replace("BOOK-", "");
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      if (transactionStatus === "capture" || transactionStatus === "settlement") {
        booking.status = "paid";
        await booking.save();
      } else if (transactionStatus === "cancel" || transactionStatus === "expire") {
        booking.status = "failed";
        await booking.save();
      }

      res.status(200).json({ message: "Notification processed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default BookingController;
