const pool = require("../config/db");

const createOrderRecord = async (user_id, pooja_id, total_amount, booking_date, booking_time, payment_status,address) => {
  const query = `
    INSERT INTO orders (user_id, pooja_id, total_amount, booking_date, booking_time, payment_status,address)
    VALUES ($1, $2, $3, $4, $5, $6,$7)
    RETURNING *;
  `;
  const values = [user_id, pooja_id, total_amount, booking_date, booking_time, payment_status, address];
  const result = await pool.query(query, values);
  return result.rows[0];
};
const getOrders = async (user_id) => {
    const query = `
      SELECT 
        o.id AS order_id,
        o.total_amount,
        o.booking_date,
        o.booking_time,
        o.payment_status AS order_payment_status,
        o.address,
        o.created_at,
        p.transaction_id,
        p.status AS payment_status,
        p.paid_at,
        pooja.name AS pooja_name,
        pooja.description AS pooja_description
      FROM orders o
      JOIN payments p ON o.id = p.order_id
      JOIN poojas pooja ON o.pooja_id = pooja.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC;
    `;
  
    const result = await pool.query(query, [user_id]);
    console.log(`Fetched ${result.rows.length} orders for user ${user_id}`);
    return result.rows; // ✅ return all orders
  };
 const getTotalOrders = async (req, res) => {
    try {
      const result = await pool.query(
        `
        SELECT 
        id AS order_id,
        user_id,
        pooja_id,
        total_amount,
        booking_date,
        booking_time,
        payment_status,
        address,
        created_at
      FROM orders
      ORDER BY created_at DESC;
      

        `
      );
  
      return result.rows; 
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  };
  module.exports = { createOrderRecord, getOrders, getTotalOrders };

