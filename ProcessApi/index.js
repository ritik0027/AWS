const mongoose = require("mongoose");
const Process = require("./models/process.model.js");
const connectToDB = require("./mongodb.js")


exports.handler = async (event) => {
  await connectToDB(); 

  try {
    const requestBody = JSON.parse(event.body);
    let { name, success_parameter, frequency, specificDays, specificDates, time, isActive, project_id, userId } = requestBody;

    if (frequency === "Weekdays") {
      if (!specificDays || specificDays.length === 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "specificDays is required for Weekdays frequency" }),
        };
      }
    } 
    else if (frequency === "Monthly") {
      if (!specificDates || specificDates.length === 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "specificDates is required for Monthly frequency" }),
        };
      }
    } 

    const newProcess = new Process({
      name,
      success_parameter,
      frequency,
      ...(specificDays ? { specificDays } : {}),
      ...(specificDates ? { specificDates } : {}), 
      time,
      isActive: isActive ?? true,
      project_id,
      createdBy: new mongoose.Types.ObjectId(userId),
      modifiedBy: new mongoose.Types.ObjectId(userId), 
    });


    await newProcess.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Process added successfully!", process: newProcess }),
    };
  } 
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
