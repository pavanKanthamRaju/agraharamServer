const pool = require("../config/db.config");

// Get all pooja items
 const getAllPoojaItems = async () => {
  const result = await pool.query(`
    SELECT pi.id, pi.pooja_id, pi.item_id, pi.quantity, i.name as item_name
    FROM pooja_items pi
    JOIN items i ON pi.item_id = i.id
  `);
  return result.rows;
};

// Get items for a specific pooja
 const getItemsByPooja = async (pooja_id) => {
  const result = await pool.query(`
    SELECT pi.id, pi.quantity, pi.price, pi.units, i.id as item_id, i.name, i.image
    FROM pooja_items pi
    JOIN items i ON pi.item_id = i.id
    WHERE pi.pooja_id = $1
  `, [pooja_id]);
  return result.rows;
};

// Add pooja item
 const addPoojaItem = async ({ pooja_id, item_id, quantity,price, units }) => {
  const payload = {
    pooja_id,
    item_id,
    quantity,
    price,
    units
  }
  const result = await pool.insert("pooja_items", payload);
  console.log("result..."+ result.name)
  return result;
  // const result = await pool.query(`
  //   INSERT INTO pooja_items (pooja_id, item_id, quantity, price, units)
  //   VALUES ($1, $2, $3, $4, $5)
  //   RETURNING *
  // `, [pooja_id, item_id, quantity,price, units]);
  // return result.rows[0];
};

// Update pooja item
 const updatePoojaItem = async (id, { quantity, price }) => {

  const payload = {
    quantity,
    price
  }
  const result = await pool.update("pooja_items", id, payload);
  console.log("result..."+ result.name)
  return result;
  // const result = await pool.query(`
  //   UPDATE pooja_items
  //   SET quantity = $1, price= $2, updated_at = NOW()
  //   WHERE id = $2
  //   RETURNING *
  // `, [quantity, id]);
  // return result.rows[0];
};

// Delete pooja item
 const deletePoojaItem = async (id) => {
  const result = await pool.delete("pooja_items",id);
    return result
  // await pool.query(`DELETE FROM pooja_items WHERE id = $1`, [id]);
};

module.exports = {getAllPoojaItems, getItemsByPooja, updatePoojaItem, deletePoojaItem, addPoojaItem}
