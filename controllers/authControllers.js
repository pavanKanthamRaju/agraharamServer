const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");
const { OAuth2Client } = require("google-auth-library");
const pool = require("../config/db");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signUp = async (req, res) => {
    console.log("signup hit.... " + req.body)
    const { name, email, phone, role, password } = req.body
    console.log("signup hit.... " + name)
    if (!name || !email || !phone || !role || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }
    try {
        const existingUser = await User.findUser(email, phone);
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }
            if (existingUser.phone === phone) {
                return res.status(409).json({ error: 'User with this phone number already exists' });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser({ name, email, phone, role, password: hashedPassword });
        res.status(201).json({ message: "user successfully created", user: newUser });
    }
    catch (err) {
        console.log(`somthing went wrong : ${err}`)
        res.status(500).json({ error: "Servor Error" })
    }
}
const login = async (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        return res.status(400).json({ error: "emai/phone number and password should not be eampty" })
    }
    try {
        const user = await User.findUser(identifier)
        if (!user) return res.status(401).json({ error: "invalid credentials..." })
        console.log("User Object Keys (Supabase):", Object.keys(user));
        console.log("Password Hash Value (Supabase):", user.password); // Check if this is undefined/null
        // const isMatch = await bcrypt.compare(password, user.password)
         const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ error: "invalid credentials..." })
        const token = generateToken(user);
        res.status(200).json({ message: "Login successful..", user, token })

    }
    catch (err) {
        console.log("something went wromng.. " + err)
        res.status(500).json({ error: "Server Error.." })
    }
}

const googleLogin = async (req, res) => {
    const { userInfo } = req.body; // contains verified Google info
    const { email, name, picture, sub } = userInfo;
    console.log("userInfo....."+userInfo)
    try {
     
    
        let user = await User.findUser(email);

        if (!user) {
            user = await User.createUser({
                name,
                email,
                phone: "",
                role: "user",
                password: null,
                profile_image: picture || null,
                provider:"google",
                google_id:sub
            })
        }
        const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ user, token: jwtToken, message: "Google login successful", })
    } catch (err) {
        console.error("Google Login Error", err.message)
        res.status(401).json({ error: "Invalid google Token" })
    }
}
module.exports = { signUp, login, googleLogin }
