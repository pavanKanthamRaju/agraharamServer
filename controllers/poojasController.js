const pool = require("../config/db")
const {getAllPoojas, createPooja} = require("../models/poojaModel")

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
module.exports = {getPoojas, postPooja}
