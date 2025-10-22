const express = require("express");
const router = express.Router();
const {getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById} = require("../controllers/poojaItemsController");

router.post("/", createPoojaItem);
router.get("/", getPoojaItems);
router.get("/:pooja_id", getPoojaItemsById);
router.put("/:id", updatePoojaItemById);
router.delete("/:id", deletePoojaItemById);

module.exports = router;
