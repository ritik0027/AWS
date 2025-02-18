const Calendar = require("./models/calender.model.js");
const connectToDB = require("./mongodb.js");

exports.handler = async (event) => {
  await connectToDB();
  try {
    const { processId } = JSON.parse(event.body);

    if (!processId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "process_id is required" }),
      };
    }

    const upcomingProcesses = await Calendar.find({
      process_id: processId,
      status: "upcoming",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ records: upcomingProcesses }),
    };
  } 
  catch (error) {
    console.error("Error fetching records:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
