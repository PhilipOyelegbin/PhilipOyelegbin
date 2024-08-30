import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_URI);
mongoose.Promise = global.Promise;

const feedbackSchema = new Schema(
  {
    full_name: { type: String, require: [true, "The full name is required"] },
    email: { type: String, require: [true, "The email is required"] },
    comment: { type: String, require: [true, "The comment is required"] },
    rating: { type: Number, require: [true, "The rating is required"] },
    approved: { type: Boolean, require: [true, "The approval is required"] },
  },
  { timestamps: true }
);

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
