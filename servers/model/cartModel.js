import mongoose from "mongoose";
const {
  ObjectId
} = mongoose.Schema;
const cartSchema = mongoose.Schema({
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
  amount: {
    type: Number,
    maxLength: 10,
    require: true,
    trim: true,
    default: 1
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("Cart", cartSchema);