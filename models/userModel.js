const pool = require('../config/db')

const getAllUsers = async()=>{
    const res = await pool.query("SELECT * FROM users")
    return  res.rows
}

const createUser = async({ name, email, password, phone, role, profile_image, provider, google_id })=>{
    const res = await pool.query("INSERT INTO users (name, email, password, phone, role, profile_image, provider, google_id) VALUES ($1, $2, $3, $4, $5,$6, $7, $8) RETURNING *", [name, email, password, phone, role, profile_image, provider, google_id]);
    return res.rows[0]
}

const findUser = async (email, phone) => {
    const res = await pool.query("SELECT * FROM users WHERE email = $1 OR phone = $2", [email, phone]);
    return res.rows[0];
}

module.exports = {getAllUsers, createUser, findUser}
