const router = require("express").Router()
const Razorpay = require("razorpay")
const {verifyToken} = require("../muddlewares/checkTokens");
const Products = require("../models/Products");
const crypto = require("crypto");
const Orders = require("../models/Orders");
const ConfirmOrders = require("../models/ConfirmOrders");
const Coupon = require("../models/Coupon");
require("dotenv").config()

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SEC,
});


router.post("/checkout", verifyToken , async (req,res) => {
    let price = undefined

    const dbproduct = await Products.findById(req.body.product.productID,{price: 1, img: 1, title: 1,_id: 0,stock: 1});

    if(!dbproduct) return res.status(404).json({success: false, message: "Sorry! Unable to find this product."})
    if(dbproduct.stock <= req.body.product.quantity) return res.status(404).json({success: false, message: "Sorry! This products is currently out of stock"})

  
    

    price = dbproduct.price * req.body.product.quantity;

    let couponIdUsed = null

    if(req.body.coupon){
      const coupon = await Coupon.findById(req.body.coupon)
      if(dbproduct.price >= coupon.minProductPrice){
        let percentDiscount = price * coupon.percentageDiscount / 100
        percentDiscount = percentDiscount <= coupon.maxDiscountAmount ? percentDiscount : coupon.maxDiscountAmount;
        price = price - percentDiscount
        couponIdUsed = req.body.coupon
      }
    }
    req.finalProduct = {...dbproduct._doc, ...req.body.product} //appending dbProduct info with user product info so that i can store the value in db

    const options = {
        amount: Number((price * 100).toFixed(2)),  // amount in the smallest currency unit && toFIxef: it will only allow two decemal values ater .
        currency: "INR",
        receipt: crypto.randomBytes(15).toString('hex')
      };
    try {
      const response = await instance.orders.create(options) //razorpay SDK call

      const orderBody = { // Saving to db
        userID: req.user.id,
        products: req.finalProduct,
        price: Number(price.toFixed(2)),
        userInfo: {
          address: req.body.userInfo.address || "N/A",
          name: req.body.userInfo.name,
          email: req.body.userInfo.email,
        },
        order: response,
      }
      if(couponIdUsed) {
        orderBody["coupon"] = couponIdUsed
        orderBody["discount"] = (dbproduct.price * req.body.product.quantity) - Number(price)
      }

      await Orders.create(orderBody)

      res.json({ order:{ id: response.id, amount: response.amount } })
    } catch (error) {
      console.log(error)
    }   
})

router.post('/verify',async (req, res) => {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature  } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const crypto = require("crypto");
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SEC)
                                    .update(body.toString())
                                    .digest('hex');

    if(expectedSignature === razorpay_signature) {
        try {
            const dborder = await Orders.findOneAndDelete({"order.id": razorpay_order_id})
            if(!dborder) return res.status(400).json({error: "sesson timeout"})
            const data = {...dborder._doc, paymentStatus: true,paymentInfo: req.body }


            if(dborder.coupon){
              const coupon = await Coupon.findById(data.coupon)
              if(coupon){
                coupon.totalDiscountAmount += Number(data.discount)
                coupon.stock -= 1
                coupon.usedCount += 1
              }

              console.log(coupon)
              await coupon.save()
            }

      
            await ConfirmOrders.create(data)
    
            await Products.findByIdAndUpdate(dborder.products[0].productID, {$inc: {purchasedCount: dborder.products[0].quantity, stock: -dborder.products[0].quantity}})
        
          } catch (error) {
            console.log(error)
            return res.status(400).json({success: false, message: "failed to process your information"});       
          }
          return res.redirect(`${process.env.BACE_FRONTEND_URL}/paymentsuccess?refrence=${razorpay_payment_id}`);
        } else {
          return res.status(400).json({success: false, signatureIsValid: false});  
        }
})



router.get("/find/:id", verifyToken, async (req, res) => {
    try {
      const orders = await ConfirmOrders.find({ userID: req.user.id }).sort({createdAt: -1});
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router
