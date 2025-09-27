import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    email: { type: String, require: [true, "The email is required"] },
    password: { type: String, require: [true, "The password is required"] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
