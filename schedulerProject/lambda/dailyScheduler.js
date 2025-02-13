const connectDB = require("../utils/db");
const Process = require("../models/Process");
const sendEmail = require("../utils/mailer");

exports.handler = async () => {
  await connectDB();

  const processes = await Process.find({ frequency: "daily", isActive: false });

  for (let process of processes) {
    await sendEmail("ritikkumar@gmail.com", `Daily Process ${process.name} executed`, "Process completed.");
    await Process.findByIdAndUpdate(process._id, { lastRun: new Date(), isActive: true });
  }

  return { statusCode: 200, body: "Daily tasks executed." };
};
