const pool = require("../config/db.config");

const createPaymentRecord = async (order_id, amount, transaction_id, status) => {
  const payload={
    order_id,
    amount,
    transaction_id,
    status,
    paid_at: NOW()
  }
  const result = pool.insert("payments", payload);
  return result
  // const query = `
  //   INSERT INTO payments (order_id, amount, transaction_id, status, paid_at)
  //   VALUES ($1, $2, $3, $4, NOW())
  //   RETURNING *;
  // `;
  // const values = [order_id, amount, transaction_id, status];
  // const result = await pool.query(query, values);
  // return result.rows[0];
};

module.exports = { createPaymentRecord };
