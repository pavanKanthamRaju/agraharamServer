
const { createOrderRecord, getOrders, getTotalOrders } = require("../models/orderModel");

 const placeOrder = async (req, res) => {
  try {
    const { user_id, pooja_id, total_amount, booking_date, booking_time } = req.body;

    const newOrder = await createOrderRecord({
      user_id,
      pooja_id,
      total_amount,
      booking_date,
      booking_time,
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getUserOrders = async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await getOrders(user_id);
      console.log("orders from controller...." ,result)
      res.json({ success: true, orders: result });
    } catch (error) {
      console.error("Error fetching user orders for user:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders from users" });
    }
  };
  const getAllOrders = async (req, res) => {
    try {
      const result = await getTotalOrders();
      console.log("orders from controller...." ,result)
      res.json({ success: true, orders: result });
    } catch (error) {
      console.error("Error fetching user orders fron all order:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders from all orders" });
    }
  };
  
module.exports = { placeOrder, getUserOrders, getAllOrders };
