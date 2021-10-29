import mongoose from "mongoose";
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
    phone: {
      type: Number,
      required: true,
      maxLength: 12,
    },
    content: {
      type: String,
      required: true,
      maxLength: 300,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);
