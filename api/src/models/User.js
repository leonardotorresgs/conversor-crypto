import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [
      {
        cryptoId: { type: String, required: true },
        symbol: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
