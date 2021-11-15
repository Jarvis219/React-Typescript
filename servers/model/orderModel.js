import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    maxLength: 50,
  },
  address: {
    type: String,
    trim: true,
    require: true,
    maxLength: 200,
  },
  note: {
    type: String,
    trim: true,
    maxLength: 300,
  },
  phone: {
    type: Number,
    required: true,
    maxLength: 12,
    trim: true,
  },
  product: {
    type: Object,
  },
  price: {
    type: Number,
    trim: true,
    maxLength: 8,
    required: true,
  },
  pay: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
  status: {
    type: String,
    default: "unconfirmed",
    required: true,
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("Order", orderSchema);