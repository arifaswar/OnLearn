// models/Counter.js
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  model: { type: String, required: true}, // misal "Student"
  seq: { type: Number, default: 0 },
});

export default mongoose.model("Counter", CounterSchema);
