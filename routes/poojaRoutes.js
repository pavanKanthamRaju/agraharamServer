const express = require("express")
const {getPoojas,postPooja} = require("../controllers/poojasController")
const router = express.Router();
router.get("/", getPoojas);
router.post("/",postPooja);
module.exports = router;

