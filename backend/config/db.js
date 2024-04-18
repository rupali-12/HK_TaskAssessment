const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose.connection;
