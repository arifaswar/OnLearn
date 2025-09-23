# OnLearn

find me and I’ll teach you

sebuah aplikasi mobile yang memudahkan calon pengajar freelance menemukan calon siswanya, dan calon siswa meenemukan calon pengajarnya

## 🏗️ Arsitektur Teknologi

- **Backend API**: Node.js + Express
- **Database**: MongoDB (Schema untuk User, Jadwal, Booking, Pembayaran)
- **Auth**: JWT (role-based: admin, pengajar, siswa)
- **Frontend Web (Admin)**: React + Material UI
- **Frontend Mobile (User App)**: React Native (Expo)
- **Payment Gateway**: Midtrans / Stripe (opsional)
- **Notification**: Firebase Cloud Messaging

---

## 📌 Fitur Inti

### 🔹 **Admin Dashboard (Web)**

- Dashboard statistik (jumlah pengajar, siswa, booking, pendapatan)
- Manajemen user (CRUD pengajar & siswa)
- Manajemen kelas & jadwal
- Monitoring transaksi & laporan
- Support chat / ticketing

### 🔹 **Pengajar (Mobile)**

- Registrasi & verifikasi pengajar
- Membuat profil pengajar (foto, bio, keahlian, tarif)
- Menentukan jadwal available
- Mengelola booking masuk (approve/reject)
- Histori pendapatan & jadwal kelas

### 🔹 **Siswa (Mobile)**

- Registrasi & login
- Browsing daftar pengajar (filter by mata pelajaran, rating, harga)
- Booking jadwal belajar (real-time availability)
- Pembayaran online (wallet/transfer/card)
- Notifikasi kelas (reminder)
- Review & rating pengajar

---

## 📐 Wireframe Konsep

### 1. **Admin Dashboard (Web)**

- **Sidebar**: Dashboard | User | Jadwal | Booking | Transaksi | Laporan
- **Dashboard Page**:
    - Card statistik (Total siswa, pengajar, booking, pendapatan)
    - Grafik booking per minggu
- **User Management**:
    - Tabel user dengan role filter
    - Action: suspend, edit, detail
- **Booking Management**:
    - List semua booking
    - Status: pending, confirmed, selesai
- **Laporan Keuangan**:
    - Grafik transaksi
    - Export ke Excel/PDF

---

### 2. **Mobile App (React Native)**

**🔹 Halaman Siswa**

- **Home**: Search pengajar, kategori pelajaran
- **Detail Pengajar**: Profil, rating, jadwal tersedia, harga per sesi → tombol “Book Now”
- **Booking Flow**: Pilih slot → bayar → konfirmasi → notifikasi
- **My Classes**: List kelas yang sudah dibooking
- **Profile**: Edit profil, histori booking

**🔹 Halaman Pengajar**

- **Home**: Ringkasan (total booking hari ini, pendapatan)
- **Schedule**: Set jadwal available
- **Booking Request**: Approve/Reject booking
- **Earnings**: Grafik pendapatan
- **Profile**: Update biodata, skill, harga

---

## 🔗 Alur Integrasi

1. **Siswa** → Cari pengajar → Booking slot → Bayar → Notifikasi
2. **Pengajar** → Terima request booking → Jadwal update otomatis
3. **Admin** → Monitor semua transaksi & booking → Bisa intervensi jika ada masalah


🏗️ Alur Project OnLearn
1. 🔙 Backend (Node.js + Express + MongoDB)
Auth & User

Registrasi (POST /api/auth/register)
Input: name, email, password, role (student/teacher)
Proses: Simpan ke MongoDB (hash password pakai bcrypt).
Output: JWT token + data user.

Login (POST /api/auth/login)
Input: email, password
Proses: Verifikasi user & password.
Output: JWT token + role.

Get Profile (GET /api/users/me)
Proses: Verifikasi JWT → return data user.

Booking & Jadwal

Buat Jadwal Pengajar (POST /api/schedules)
Input: teacherId, availableSlots[]
Proses: Simpan jadwal di DB.

Cari Pengajar (GET /api/teachers?subject=math&price<100000)
Proses: Query dari MongoDB.
Output: daftar pengajar dengan filter.

Booking Kelas (POST /api/bookings)
Input: studentId, teacherId, scheduleId, paymentInfo
Proses: Buat booking, update slot jadi occupied.

Konfirmasi Booking (PUT /api/bookings/:id/confirm) (oleh pengajar)
Proses: update status booking → confirmed.

Transaksi

Create Payment (POST /api/payments)
Proses: Integrasi Midtrans/Stripe, simpan transaksi di DB.

Get Transactions (GET /api/payments/:userId)
Output: histori transaksi user.

Admin

Dashboard Data (GET /api/admin/stats)
Output: jumlah user, booking, pendapatan.

Manage User (PUT/DELETE /api/admin/users/:id)
Action: suspend, delete user.

Report Keuangan (GET /api/admin/reports)
Output: data transaksi + export CSV.

2. 🌐 Frontend Web (Admin – React + Material UI)

Login Admin → form login → call POST /api/auth/login.

Dashboard → tampilkan statistik (API: /api/admin/stats).

User Management → tabel user → fetch /api/admin/users.

Booking Management → tabel booking → fetch /api/bookings.

Transaction Reports → grafik + export (API: /api/admin/reports).

Suspend/Edit User → call PUT /api/admin/users/:id.

3. 📱 Frontend Mobile (User – React Native + Expo)
🔹 Untuk Siswa

Registrasi & Login → form UI → call POST /api/auth/register & POST /api/auth/login.

Home → fetch list pengajar dari /api/teachers.

Detail Pengajar → fetch detail + jadwal dari /api/schedules/:teacherId.

Booking Flow → pilih slot → call POST /api/bookings.

Pembayaran → integrasi Midtrans/Stripe → call POST /api/payments.

My Classes → fetch /api/bookings?studentId=me.

Profile → call /api/users/me.

🔹 Untuk Pengajar

Registrasi/Login → sama dengan siswa tapi role = teacher.

Schedule → buat jadwal dengan POST /api/schedules.

Booking Request → fetch /api/bookings?teacherId=me.

Confirm/Reject Booking → call PUT /api/bookings/:id/confirm.

Earnings → fetch /api/payments?teacherId=me.

Profile → edit profil dengan PUT /api/users/:id.

4. 🔗 Alur Integrasi Lengkap

Siswa Registrasi

Backend: POST /api/auth/register → simpan user role=student

Frontend Mobile: UI form registrasi

Pengajar Registrasi

Backend: POST /api/auth/register → simpan user role=teacher

Frontend Mobile: UI form registrasi pengajar + upload bio, skill

Admin Monitoring

Backend: GET /api/admin/stats

Frontend Web: Tampilkan dashboard

Booking Flow

Siswa pilih pengajar → API /api/teachers

Pilih jadwal → API /api/schedules

Booking → API POST /api/bookings

Bayar → API POST /api/payments

Pengajar confirm → API PUT /api/bookings/:id/confirm

Notifikasi dikirim via FCM

⚡ Jadi flow project jelas:

Backend = REST API (Node.js + Express + MongoDB)

Frontend Web (Admin) = manajemen data

Frontend Mobile (User) = pengajar & siswa interaksi




🔹 1. Konsep Schedule

Schedule di sini adalah jadwal milik seorang guru (teacher) dalam periode tertentu, misalnya 1 minggu.

Satu schedule terkait langsung dengan 1 guru.

Schedule bisa disusun per minggu (weekStart → kapan awal minggu itu dimulai, misalnya Senin 2025-09-22).

Di dalam schedule ini ada kumpulan slot.

🔹 2. Konsep Slot

Slot adalah bagian terkecil dari jadwal — bisa dianggap sebagai 1 sesi waktu yang bisa dipakai untuk booking.

Contoh: Hari Senin jam 08:00 – 09:30 → ini satu slot.

Slot selalu memiliki status:

"available" → artinya bisa dipesan siswa.

"occupied" → artinya sudah ada siswa yang booking.

Setiap slot punya slotId (unik, bisa auto-generate misalnya pakai UUID).

Slot juga punya day, start, dan end supaya mudah dibaca manusia.

🔹 3. Hubungan Schedule ↔ Slot

Schedule adalah kumpulan slot untuk satu guru dalam 1 minggu.

Misalnya guru A punya jadwal minggu ini (weekStart = 2025-09-22), maka di dalam schedule itu ada banyak slot:

{
  "teacher": "teacherId123",
  "weekStart": "2025-09-22",
  "slots": [
    {
      "id": 1,
      "day": "monday",
      "start": "08:00",
      "end": "09:30",
      "status": "available"
    },
    {
      "id": 2,
      "day": "monday",
      "start": "10:00",
      "end": "11:30",
      "status": "occupied"
    }
  ]
}

🔹 4. Alur Penggunaan

Mari kita breakdown alurnya dalam aplikasi:

(1) Guru membuat jadwal (schedule)

Guru menginput jadwalnya (hari & jam yang tersedia).

Backend akan membuat 1 Schedule document untuk minggu itu.

Lalu sistem generate beberapa slot berdasarkan input guru.

(2) Siswa melihat jadwal

Siswa bisa melihat daftar slot yang masih "available" dari schedule guru.

Misalnya: Senin jam 08:00 – 09:30 masih kosong.

(3) Siswa booking slot

Siswa memilih slot tertentu (slotId).

Sistem update status slot dari "available" → "occupied".

Bisa juga dibuat relasi dengan Booking model untuk mencatat siapa yang ambil slot itu.

(4) Manajemen jadwal guru

Guru bisa lihat jadwalnya, tahu slot mana yang sudah penuh (occupied) dan mana yang kosong (available).

Bisa menambah slot baru atau menghapus slot lama.

🔹 5. Ilustrasi Sederhana

Bayangkan seperti kalender mingguan:

📅 Schedule Minggu 22 – 28 Sept 2025 untuk Guru Budi

Senin

08:00 – 09:30 → available

10:00 – 11:30 → occupied (sudah dibooking Andi)

Selasa

13:00 – 14:30 → available

Slot = “kotak kecil” di dalam kalender
Schedule = “keseluruhan kalender minggu itu”.




Oke, kita buat BookingController dengan alur:

Siswa cari guru

Bisa filter subject, lokasi terdekat, dan hari dari slot Schedule.

Lokasi kita hitung pakai koordinat (lat, lng) dengan rumus Haversine distance.

Hanya ambil slot yang status: available.

Siswa booking slot guru

Input: teacherId, scheduleId, slotId, mode.

Server cek apakah slot masih available.

Hitung harga (amount) berdasarkan mode (online/offline).

Simpan ke Booking + update Schedule.slots.status = occupied.

📌 Controller bookingController.js
import Booking from "../models/Booking.js";
import Teacher from "../models/Teacher.js";
import Schedule from "../models/Schedule.js";

// ===== Helper untuk hitung jarak (km) =====
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 1. Siswa cari guru berdasarkan filter
export const searchTeachers = async (req, res) => {
  try {
    const { subject, day, lat, lng, maxDistance } = req.query;

    // cari guru sesuai subject
    let query = {};
    if (subject) query.subject = { $in: [subject] };

    const teachers = await Teacher.find(query);

    let results = [];
    for (let teacher of teachers) {
      // cek jarak (jika lat lng dikirim)
      if (lat && lng && teacher.location?.coordinates) {
        const dist = getDistance(
          parseFloat(lat),
          parseFloat(lng),
          teacher.location.coordinates.lat,
          teacher.location.coordinates.lng
        );
        if (maxDistance && dist > maxDistance) continue; // skip kalau terlalu jauh
        teacher = teacher.toObject();
        teacher.distance = dist.toFixed(2);
      }

      // ambil schedule guru + filter slot sesuai hari
      const schedules = await Schedule.find({ teacher: teacher._id });
      let availableSlots = [];
      for (let s of schedules) {
        const slots = s.slots.filter(
          (slot) =>
            slot.status === "available" &&
            (!day || slot.day.toLowerCase() === day.toLowerCase())
        );
        if (slots.length) {
          availableSlots.push({ scheduleId: s._id, slots });
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
};

// 2. Siswa booking slot guru
export const bookSlot = async (req, res) => {
  try {
    const studentId = req.user.id; // siswa login
    const { teacherId, scheduleId, slotId, mode } = req.body;

    // cek guru
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // cek schedule
    const schedule = await Schedule.findOne({ _id: scheduleId, teacher: teacherId });
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    // cek slot
    const slot = schedule.slots.find((s) => s.slotId === slotId);
    if (!slot || slot.status !== "available") {
      return res.status(400).json({ message: "Slot not available" });
    }

    // hitung harga
    const amount = mode === "offline" ? teacher.priceOffline : teacher.priceOnline;
    const adminFee = amount * 0.1; // contoh 10% fee
    const teacherAmount = amount - adminFee;

    // buat booking
    const booking = new Booking({
      student: studentId,
      teacher: teacherId,
      schedule: scheduleId,
      slotId,
      mode,
      amount,
      adminFee,
      teacherAmount,
    });

    await booking.save();

    // update slot jadi occupied
    slot.status = "occupied";
    await schedule.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

📌 Routes bookingRoutes.js
import express from "express";
import { searchTeachers, bookSlot } from "../controllers/bookingController.js";
import { authStudent } from "../middleware/auth.js";

const router = express.Router();

// siswa cari guru
// contoh: GET /api/bookings/search?subject=math&day=monday&lat=-6.2&lng=106.8&maxDistance=10
router.get("/search", authStudent, searchTeachers);

// siswa booking slot
router.post("/", authStudent, bookSlot);

export default router;

📌 Alur Use Case

Siswa mencari guru
GET /api/bookings/search?subject=math&day=monday&lat=-6.2&lng=106.8&maxDistance=10
→ server kembalikan daftar guru + slot available.

Siswa booking slot
POST /api/bookings
Body:

{
  "teacherId": "66f3...",
  "scheduleId": "66f4...",
  "slotId": "123e4567",
  "mode": "online"
}


→ server buat booking + update slot jadi occupied.