const express = require("express");
const router = express.Router();
const { addItem, getItems,updateItemController,deleteItemController } = require("../controllers/itemsController");

router.post("/", addItem);
router.get("/", getItems);
router.put("/:id", updateItemController);
router.delete("/:id", deleteItemController);

module.exports = router;
