const pool = require('../config/db')

const getAllUsers = async()=>{
    const res = await pool.query("SELECT * FROM users")
    return  res.rows
}

const createUser = async({ name, email, password, phone, role })=>{
    const res = await pool.query("INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4,$5) RETURNING *", [name, email, password, phone, role]);
    return res.rows[0]
}

const findUser = async (identifier) => {
    const res = await pool.query("SELECT * FROM users WHERE email = $1 OR phone = $1", [identifier]);
    return res.rows[0];
}

module.exports = {getAllUsers, createUser, findUser}
