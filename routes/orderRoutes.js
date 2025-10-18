const express = require("express");
const router = express.Router();
const { getUserOrders, getAllOrders } = require("../controllers/orderController");
router.get("/getAllOrders", getAllOrders);
// GET all orders for a user
router.get("/:user_id", getUserOrders);


module.exports = router;
