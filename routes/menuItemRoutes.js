const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

//POST method for menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET Method for menu
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Parametrised API calls
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //Extract the work type from the URL parameter
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invailid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Update method
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; //Extract the id from the URL parameter
    const updateMenuData = req.body; //Updated data for the person

    const response = await MenuItem.findByIdAndUpdate(
      menuId,
      updateMenuData,
      {
        new: true, //return the updated document
        runValidators: true, // Run Mongoose Validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete method
router.delete('/:id',async(req,res)=>{
  try{
      const menuId = req.params.id; //Extract the person's ID from the URL parameter

      //Assuming you have a Menu model
      const response=await MenuItem.findByIdAndDelete(menuId);
      if(!response){
          return res.status(404).json({error:'Menu not found'});
      }

      console.log('data deleted');
      res.status(200).json({message:'Menu Deleted Successfully'});

  }catch(err){
      console.log(err);
      res.status(500).json({ error:'Internal Server Error'});

  }
})

// comment added here for testing purpose
module.exports = router;
