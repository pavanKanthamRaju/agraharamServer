const express = require("express")
const router = express.Router();
const {signUp, login, googleLogin} = require("../controllers/authControllers")

router.post("/login", login )
router.post ("/signup", signUp)
router.post ("/google-login", googleLogin)

module.exports = router;