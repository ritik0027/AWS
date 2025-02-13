const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Process name
  frequency: { type: String, enum: ["daily", "weekly"], required: true }, // Daily ya Weekly
  lastRun: { type: Date, default: null }, // Last run date
  isActive: { type: Boolean, default: false }, // Process Active/InActive status
});

module.exports = mongoose.model("Process", processSchema);