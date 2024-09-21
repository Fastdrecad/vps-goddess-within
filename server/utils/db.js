require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");

const setupDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    console.log("MONGO_URI:", mongoURI);
    await mongoose.connect(mongoURI);
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = setupDB;
