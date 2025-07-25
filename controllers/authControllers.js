const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const signUp = async (req,res)=>{
    console.log("signup hit.... "+ req.body)
     const {name, email,phone, role, password} = req.body
     console.log("signup hit.... "+ name)
    if(!name || !email || !phone || !role || !password){
        return res.status(400).json({error: 'All fields are required'})
    }
    try{
        const existinfUser = await User.findUser(email) || await User.findUser(phone)
        if(existinfUser){
            return res.status(409).json({error:'user allready exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = User.createUser({name,email,phone,role, password:hashedPassword})
        res.status(201).json({message:"user successfully created", user:newUser})

    }
    catch(err){
        console.log(`somthing went wrong : ${err}`)
        res.status(500).json({error: "Servor Error"})
    }
}
const login = async (req, res)=>{
    const {identifier, password} = req.body;
    if(!identifier || !password){
        return res.status(400).json({error: "emai/phone number and password should not be eampty"})
    }
    try{
        const user = await User.findUser(identifier)
        if(!user) return res.status(401).json({error: "invalid credentials..."})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({erroe: "invalid credentials..."})
        res.status(200).json({message: "Login successful..", user:user})

    }
    catch(err){
        console.log("something went wromng.. "+err)
        res.status(500).json({error:"Server Error.."})
    }
}
module.exports = {signUp, login}