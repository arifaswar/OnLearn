import mongoose from "mongoose";
import Counter from "./Counter.js";

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "student" },
    phone: String,
    school: String,
    address: String,
    location: {
      city: String,
      coordinates: { lat: Number, lng: Number },
    },
    wallet: { balance: { type: Number, default: 0 } },
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const rolePrefix = this.role === 'teacher' ? "T" : this.role === 'admin' ? "A" : "S"
    const counter = await Counter.findOneAndUpdate(
      { model: this.role },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = `${rolePrefix}-${String(counter.seq).padStart(1)}`;
  }
  next();
});

export default mongoose.model("Student", StudentSchema);
