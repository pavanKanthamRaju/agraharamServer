const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const { createOrderRecord } = require("../models/orderModel");
const { createPaymentRecord } = require("../models/paymentModel");

 const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: process.env.RAZORPAY_KEY_ID});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

 const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id,
      razorpay_payment_id, 
      razorpay_signature ,
      user_id,
      pooja_id,
      total_amount,
      booking_date,
      booking_time,
    address} = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Update order in DB as paid

        // ✅ Create order record
    const order = await createOrderRecord(
      user_id,
      pooja_id,
      total_amount,
      booking_date,
      booking_time,
      "paid",
      address
    );

    // ✅ Create payment record
    await createPaymentRecord(
      order.id,
      total_amount,
      razorpay_payment_id,
      "success"
    );
    res.json({
      success: true,
      message: "Payment verified and stored successfully",
      orderId: order.id,
    });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed"+error });
  }
};

module.exports = {createOrder, verifyPayment}
