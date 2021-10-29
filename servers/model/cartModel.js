import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const cartSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "user",
      require: true,
    },
    product: {
      type: ObjectId,
      ref: "Product",
      require: true,
    },
    size: {
      type: Array,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      require: true,
      maxlength: 1000,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      maxlength: 10,
      trim: true,
    },
    sale: {
      type: Number,
      maxlength: 10,
    },
    totalMoney: {
      type: Number,
      maxlength: 10,
      require: true,
      trim: true,
    },
    amount: {
      type: Number,
      maxlength: 10,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Cart", cartSchema);
