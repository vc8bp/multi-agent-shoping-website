const express = require('express');
const Coupon = require('../models/Coupon');
const { VerifiedSellerWithToken } = require('../muddlewares/checkTokens');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.post("/", VerifiedSellerWithToken ,async (req, res) => {
  try {
    const {
      couponType,
      allowedProducts,
      percentageDiscount,
      maxDiscountAmount,
      minProductPrice,
      stock,
      title,
    } = req.body;

    const newCoupon = new Coupon({
      agentId: req.user.id,
      couponType,
      allowedProducts,
      percentageDiscount,
      maxDiscountAmount,
      minProductPrice,
      stock,
      title,
    });

    const savedCoupon = await newCoupon.save();

    res.status(201).json(savedCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/", VerifiedSellerWithToken ,async (req, res) => {
  try {
    const coupons = await Coupon.find({agentId: req.user.id});
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/:agentId" ,async (req, res) => {
  if(!req.params.agentId) return res.status(400).json({message: "Failed to fetch coupons Please Reload the page"})
  try {
    const coupons = await Coupon.find({agentId: req.params.agentId, stock: { "$gt" : 0 } });
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;