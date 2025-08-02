const pool = require("../config/db")

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
  module.exports = {getAllPoojas, createPooja}