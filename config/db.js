const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


const pgAdapter = {
  // Mimics pool.query(text, values)
  query: async (text, values = []) => {
      try {
          const result = await pool.query(text, values);
          return {
              rows: result.rows,
              rowCount: result.rowCount
          };
      } catch (error) {
          console.error("Local Postgres Adapter Error:", error);
          throw error;
      }
  },

  // Native access to the pg pool if needed
  native: pool,

  insert: async (table, data) => {
      console.log("pg payload is.." + JSON.stringify(data));
      
      const keys = Object.keys(data);
      const values = Object.values(data);
      const columns = keys.join(', ');
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

      const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
      
      const result = await pool.query(sql, values);
      return result.rows[0]; // Returns single object to match Supabase .single()
  },

  update: async (table, id, data) => {
      console.log("pg update payload is.." + JSON.stringify(data));
      
      const keys = Object.keys(data);
      const values = Object.values(data);
      
      // Build "column1 = $1, column2 = $2"
      const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
      
      // Add ID to values for the WHERE clause
      values.push(id);
      const idPosition = values.length;

      const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${idPosition} RETURNING *`;
      
      const result = await pool.query(sql, values);
      return result.rows[0];
  },

  delete: async (table, id) => {
      const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
      const result = await pool.query(sql, [id]);
      return result.rows[0];
  },
  findItem : async(name)=>{
    const sql  =`SELECT * FROM items WHERE name = $1`
    const result = await pool.query(sql, [name]);
    return result.rows[0];
  }
};

module.exports = pgAdapter;
