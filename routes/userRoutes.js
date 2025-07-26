const express = require("express");
const router = express.Router();
const {getUsers, createUser} = require("../controllers/userController")
const verifyToken = require("../middlewares/jwtMiddleware")

router.get("/", verifyToken, getUsers)
router.post("/", createUser)

module.exports = router;
