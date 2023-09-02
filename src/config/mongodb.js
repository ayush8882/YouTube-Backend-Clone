const mongoose = require("mongoose");

require("dotenv").config();
const DBconnection = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the DATABASE");
  } catch (error) {
    console.log("Error found", error);
    process.exit();
  }
};

module.exports = { DBconnection };
