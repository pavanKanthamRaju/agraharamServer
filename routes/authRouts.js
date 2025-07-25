const express = require("express")
const router = express.Router();
const {signUp, login} = require("../controllers/authControllers")

router.post("/login", login )
router.post ("/signup", signUp)

module.exports = router;