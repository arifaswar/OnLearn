import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
  id: Number,
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule" },
  slotId: String,
  mode: { type: String, enum: ["online", "offline"] },
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ["paid", "released", "refunded"],
    default: "paid",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  proofPhoto: String, // path to photo when teacher uploads proof
  adminFee: Number,
  teacherAmount: Number,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Booking", BookingSchema);
