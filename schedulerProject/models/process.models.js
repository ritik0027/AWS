const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },
  frequency: { 
    type: String,
    enum: ["daily", "weekly"], 
    required: true 
  }, 
  lastRun: { 
    type: Date, 
    default: null 
  },
  isActive: { 
    type: Boolean, 
    default: false 
  },
});

module.exports = mongoose.model("Process", processSchema);
