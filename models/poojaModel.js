const pool = require("../config/db.config")

 const getAllPoojas =  async ()=>{
    const result = await pool.query("SELECT * FROM poojas");
    return result.rows
}

 const createPooja = async (pooja) => {
    const { name, price, duration, description, image } = pooja;
    const result = await pool.query(
      'INSERT INTO poojas (name, base_price, duration, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, duration, description, image]
    );
    return result.rows[0];
  };
  const modifyPooja = async (id, pooja) => {
    const { name, price, duration, description, image } = pooja;
    const result = await pool.query(
      `UPDATE poojas
       SET name = $1,
           base_price = $2,
           duration = $3,
           description = $4,
           image_url = $5
       WHERE id = $6
       RETURNING *`,
      [name, price, duration, description, image, id]
    );
    return result.rows[0];
  };
  
  module.exports = {getAllPoojas, createPooja, modifyPooja}