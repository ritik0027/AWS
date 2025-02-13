require("dotenv").config();

const mongoose = require("mongoose");
const schedule = require("./models/schedule.model.js");

const uri = process.env.MONGODB_URI;
let conn = null;

exports.handler = async (event) => {
  try {
    if (!conn) {
      console.log("Connecting to MongoDB...");
      conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected Successfully!");
    } 
    else {
      console.log("Using existing MongoDB connection");
    }

    const user = new schedule({
      name: event.name || "Unknown",
      age: event.age || 0,
    });

    await user.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User added successfully!", user }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
