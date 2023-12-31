const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent"
  },
  title: {
    type: String,
    required: true,
  },
  percentageDiscount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  maxDiscountAmount: {
    type: Number,
    default: null,
  },
  minProductPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  totalDiscountAmount: {
    type: Number,
    default: 0,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
