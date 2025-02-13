const connectDB = require("../utils/db");
const Process = require("../models/Process");

exports.handler = async () => {
  await connectDB();

  await Process.updateMany({ isActive: true }, { isActive: false });

  return { statusCode: 200, body: "Processes marked inactive." };
};
