const pool = require('../config/db')

const getAllUsers = async()=>{
    const res = await pool.query("SELECT * FROM users")
    return  res.rows
}

const createUser = async(name, email)=>{
    const res = await pool.query("INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *", [name,email]);
    return res.rows[0]
}

module.exports = {getAllUsers, createUser}