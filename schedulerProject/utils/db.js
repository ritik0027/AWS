const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; 
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
