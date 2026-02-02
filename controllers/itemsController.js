const { createItem, getAllItems, updateItem, deleteItem, findItem } = require("../models/itemsModel");

// POST /api/items
const addItem = async (req, res) => {
  try {
    const { item_name, description, default_quantity, price, units, image } = req.body;

    if (!item_name) {
      return res.status(400).json({ success: false, message: "Item name is required" });
    }
    const existingItem = findItem(item_name)
    if (existingItem) {
      return res.status(400).json({ success: false, message: "Item allready existed please enter new Item" });
    }
    const newItem = await createItem({ item_name, description, default_quantity, price, units, image });
    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /api/items
const getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json({ success: true, items });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const updateItemController = async (req, res) => {
    try {
      const { id } = req.params;
      const { item_name, description, default_quantity, price, units, image } = req.body;
    
  
      const updatedItem = await updateItem(id, { item_name, description, default_quantity, price, units, image  });
  
      if (!updatedItem) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
  
      res.json({ success: true, item: updatedItem });
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ success: false, message: "Failed to update item" });
    }
  };
  
  // ✅ Delete Item
  const deleteItemController = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await deleteItem(id);
  
      if (!deletedItem) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
  
      res.json({ success: true, message: "Item deleted successfully", item: deletedItem });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ success: false, message: "Failed to delete item" });
    }
  };

module.exports = { addItem, getItems,updateItemController,deleteItemController };
