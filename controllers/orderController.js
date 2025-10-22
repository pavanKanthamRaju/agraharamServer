const { createOrderRecord, getOrders, getTotalOrders } = require("../models/orderModel");
const { sendSms } = require("../utils/twilioClient");  // ✅ corrected import name

const placeOrder = async (req, res) => {
  try {
    const { user_id, pooja_id, total_amount, booking_date, booking_time, phone_number } = req.body;

    // ✅ Validate phone number (basic)
    if (!/^\d{10}$/.test(phone_number)) {
      return res.status(400).json({ success: false, message: "Invalid phone number. Must be 10 digits." });
    }

    // ✅ Create the order
    const newOrder = await createOrderRecord({
      user_id,
      pooja_id,
      total_amount,
      booking_date,
      booking_time,
      phone_number
    });

    // ✅ SMS message
    const message = `Hi! Your order #${newOrder.id} has been placed with Agraharam. Total: ₹${newOrder.total_amount}. We'll update you when it's confirmed.`;
console.log("twilio message is..", message)
    // ✅ Try sending SMS
    try {
      const twResp = await sendSms({ to: `+91${phone_number}`, body: message });
      console.log("SMS sent:", twResp.sid);
    } catch (smsErr) {
      console.error("❌ SMS failed:", smsErr.message);
      // Optional: log error for retry later
    }
  console.log("orderer creation has been done order id is "+newOrder.id)
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Fetch user orders
const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await getOrders(user_id);
    res.json({ success: true, orders: result });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// ✅ Fetch all orders
const getAllOrders = async (req, res) => {
  try {
    const result = await getTotalOrders();
    res.json({ success: true, orders: result });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch all orders" });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders };
