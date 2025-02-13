const mongoose=require("mongoose");

const scheduleSchema = new mongoose.Schema({
    name: String,
    age:Number
});

module.exports = mongoose.model("Schedule", scheduleSchema);