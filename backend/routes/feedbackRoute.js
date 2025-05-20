const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");

/**
 * This route is created for adding new feedback from frontend
 *
 */
router.post("/submit", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//getting all submitted feedbacks
router.get("/all", async (req, res) => {
  try {
    const all = await Feedback.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * this route is created for deleting feedback
 * argument feedback ID is required for deleting feedback from database
 * return true if the feedback is deleted
 */

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

  
    const result = await Feedback.findByIdAndDelete(id); 
    if (!result) {
      return res.json({ success: false, message:"Feedback Not Found"});   }   
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id',async (req, res)=>{
   const { id } = req.params;
  try{

    const update = await Feedback.findByIdAndUpdate(id, req.body, {new:true});
    res.json(update)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})


module.exports = router;
