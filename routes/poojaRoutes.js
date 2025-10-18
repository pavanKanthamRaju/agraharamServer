const express = require("express")
const {getPoojas,postPooja, updatePooja} = require("../controllers/poojasController")
const router = express.Router();
router.get("/", getPoojas);
router.post("/",postPooja);
router.put("/:id", updatePooja);
module.exports = router;

