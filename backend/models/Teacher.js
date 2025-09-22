import mongoose from "mongoose";
import Counter from "./Counter.js";

const TeacherSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "teacher" },
    bio: String,
    subject: [String],
    mode: { type: String, enum: ["online", "offline"], default: "online" },
    priceOnline: { type: Number, default: 35000 }, // 90 min
    priceOffline: { type: Number, default: 75000 },
    location: {
      city: String,
      coordinates: { lat: Number, lng: Number },
    },
    wallet: { balance: { type: Number, default: 0 } },
  },
  { timestamps: true }
);

TeacherSchema.pre("save", async function (next) {
  if (this.isNew) {
    const rolePrefix = this.role === 'student' ? "S" : this.role === 'admin' ? "A" : "T"
    const counter = await Counter.findOneAndUpdate(
      { model: this.role },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = `${rolePrefix}-${String(counter.seq).padStart(1)}`;
  }
  next();
});

export default mongoose.model("Teacher", TeacherSchema);
