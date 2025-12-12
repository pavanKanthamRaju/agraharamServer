const pool = require("../config/db.config");

const createItem = async ({ item_name, description,default_quantity, price, units, image }) => {
    const query = `
      INSERT INTO items (name, description, default_quantity, price,units, image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [item_name, description, default_quantity, price, units, image];
    const result = await pool.query(query, values);
    return result.rows[0];
  };


const getAllItems = async()=>{
    const res = await pool.query("SELECT * FROM items")
    return  res.rows
}
const updateItem = async (id, { item_name, description, default_quantity, price, units, image  }) => {
    const query = `
      UPDATE items
      SET name = $1,
          description = $2,
          default_quantity = $4,
         price = $5,
         units = $6,
         image = $7,
          updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [item_name, description, id, default_quantity, price, units, image ];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  const deleteItem = async (id) => {
    const query = `DELETE FROM items WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };

module.exports ={createItem,getAllItems, updateItem, deleteItem}
