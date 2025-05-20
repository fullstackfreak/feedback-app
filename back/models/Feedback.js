const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be atleast 3 characters"],
  },
  message:{
    type:String,
    required:[true, 'Message is required'],
    maxlength:[200,  "Message cannot exceed 200 charactors"]
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    required:[true, 'Rating between 1 and 5 is required']
  }
},{timestamps:true});

module.exports = mongoose.model('Feedback', feedBackSchema);