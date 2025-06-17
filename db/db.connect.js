const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initialiseDatabase = () => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB Connected Successfully."))
    .catch(err => console.log("Error Connecting DataBase:", err)) 
};

module.exports = {initialiseDatabase};