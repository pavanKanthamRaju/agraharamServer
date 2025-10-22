const {getAllPoojaItems, getItemsByPooja,addPoojaItem, updatePoojaItem,deletePoojaItem} = require("../models/poojaItemsModal")

 const getPoojaItems = async (req, res) => {
  const items = await getAllPoojaItems();
  res.json(items);
};

 const getPoojaItemsById = async (req, res) => {
  console.log("request params....."+ JSON.stringify(req.params));
  const { pooja_id } = req.params;

  const items = await getItemsByPooja(pooja_id);
  res.json(items);
};

 const createPoojaItem = async (req, res) => {
  const newItem = await addPoojaItem(req.body);
  res.json(newItem);
};

 const updatePoojaItemById = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await updatePoojaItem(id, req.body);
  res.json(updatedItem);
};

 const deletePoojaItemById = async (req, res) => {
  const { id } = req.params;
  await deletePoojaItem(id);
  res.json({ message: "Deleted successfully" });
};
module.exports={getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById}
