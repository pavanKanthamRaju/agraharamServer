const pool = require("../config/db")
const {getAllPoojas, createPooja, modifyPooja} = require("../models/poojaModel")

const getPoojas = async (req,res)=>{
try{
    const result = await getAllPoojas();
    res.status(200).json(result);
}catch(err){
    res.status(500).json({message:"Failed to fetch Poojas"})
}
}

const postPooja = async (req, res) => {
    try {
      const newPooja = await createPooja(req.body);
      res.status(201).json(newPooja);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create pooja' });
    }
  };
  const updatePooja = async (req, res) => {
    try {
      const { id } = req.params; // get pooja id from URL
      const poojaData = req.body; // updated pooja data from frontend
  
      if (!id) {
        return res.status(400).json({ error: "Pooja ID is required for update" });
      }
  
      const updatedPooja = await modifyPooja(id, poojaData); // your model function
      res.status(200).json(updatedPooja);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update pooja" });
    }
  };
module.exports = {getPoojas, postPooja, updatePooja}
