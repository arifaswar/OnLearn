import mongoose from "mongoose";
import Counter from "./Counter";
const TeacherSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "teacher" },
    bio: String,
    subjects: [String],
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

StudentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Student" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;
  }
  next();
});
export default mongoose.model("Teacher", TeacherSchema);
