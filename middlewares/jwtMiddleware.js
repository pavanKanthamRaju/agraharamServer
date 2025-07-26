const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.JWT_SECRET

const verifyToken = (req,res,next)=>{
const authHeader = req.headers.authorization
console.log(`jwt token is is... ${authHeader}`)
if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({error:"unathorized - No token Provided"});
}
const token = authHeader.split(" ")[1]
try{
    const decodedToken = jwt.verify(token, SECRET_KEY)
    req.user = decodedToken //which is nothing but encoded user data while creating json token
    next();
}
catch(err){
    return res.status(403).json({error:"Invalid or expired token"})
}
}

module.exports = verifyToken;