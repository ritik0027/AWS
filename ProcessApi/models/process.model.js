const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  success_parameter: { 
    type: [String], 
    required: true 
   },
  frequency: { 
    type: String, 
    required: true 
  },
  specificDays: { 
    type: [String],
    default: [] 
  },
  specificDates: { 
    type: [String], 
    default: [] 
  },
  time: { 
    type: [String], 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  project_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "Project" 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  modifiedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Process", processSchema);
