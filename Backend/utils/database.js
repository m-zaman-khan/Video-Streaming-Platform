const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const databaseConnection = async () => {
    try {
      await mongoose.connect(process.env.Mongo_URL).then(()=>console.log("DB Connection Successfully")).catch((err)=>console.log("error"));

    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1); // Exit the process with failure
    }
  };
  
  module.exports = databaseConnection;
