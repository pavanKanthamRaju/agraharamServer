const pool = require("../config/db");

const createItem = async ({ item_name, description }) => {
    const query = `
      INSERT INTO items (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [item_name, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  };


const getAllItems = async()=>{
    const res = await pool.query("SELECT * FROM items")
    return  res.rows
}
const updateItem = async (id, { item_name, description }) => {
    const query = `
      UPDATE items
      SET name = $1,
          description = $2,
          updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [item_name, description, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  const deleteItem = async (id) => {
    const query = `DELETE FROM items WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };

module.exports ={createItem,getAllItems, updateItem, deleteItem}
