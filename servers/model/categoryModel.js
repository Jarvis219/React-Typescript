import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
