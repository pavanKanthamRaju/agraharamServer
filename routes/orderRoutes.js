const express = require("express");
const router = express.Router();
const { getUserOrders } = require("../controllers/orderController");

// GET all orders for a user
router.get("/:user_id", getUserOrders);

module.exports = router;
