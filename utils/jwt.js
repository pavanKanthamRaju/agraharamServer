const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.JWT_SECRET
const generateToken = (user) =>{
    return jwt.sign(
        {id:user.id, email:user.email, role:user.role},
        SECRETE_KEY,
        {expiresIn: "7d"}
    );
}

module.exports = {generateToken}