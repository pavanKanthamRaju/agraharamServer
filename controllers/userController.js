const User = require('../models/userModel')
const redisClient = require('../config/redis')

const getUsers = async(req, res)=>{
    console.log("user controller hits....")
    try{
        const cachedData = await redisClient.get("users");
        if(cachedData){
            console.log("data from Redis"+ cachedData)
            return res.status(200).json(JSON.parse(cachedData))
        }
        const users = await User.getAllUsers();
        await redisClient.set("users", JSON.stringify(users), {EX: 60})
        res.status(200).json(users);
        
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}
const createUser = async(req, res)=>{
    const {name, email} = req.body
    try{
        const createdUser = await User.createUser(name,email)
        res.status(200).json({user: createdUser})
        await redisClient.del('users'); 
    }catch(err){
        res.status(500).json({error: err.message})
    
    }
}
module.exports = {getUsers, createUser}