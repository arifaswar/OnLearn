import mongoose from "mongoose";
const SlotSchema = new mongoose.Schema({
  id: Number,
  day: { type: String }, // e.g. 'monday'
  start: String, // '08:00'
  end: String, // '09:30'
  slotId: String, // unique id for a slot instance
  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available",
  },
});
const ScheduleSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  weekStart: Date,
  slots: [SlotSchema],
});
export default mongoose.model("Schedule", ScheduleSchema);
