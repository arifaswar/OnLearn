import mongoose  from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        userId: { type: Number, unique: true },
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, default: 'admin'}
    },
    {timestamps: true}
);
AdminSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastUser = await this.constructor.findOne().sort({ userId: -1 });
    this.userId = lastUser ? lastUser.userId + 1 : 1; // mulai dari 1
  }
  next();
});

export default mongoose.model("Admin", AdminSchema);