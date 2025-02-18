const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  process_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"Process",
    required: true 
  },
  acceptedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    default: null 
  },
  process_date_time: { 
    type: Date, 
    required: true 
  },
  remarks: { 
    type: String, 
    default: "" 
  },
  status: { 
    type: String, 
    required: true 
  },
  success_status: { 
    type: [string], 
    default: {} 
  },
});

module.exports = mongoose.model("Calendar", CalendarSchema);
