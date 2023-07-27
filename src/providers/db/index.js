const mongoose = require('mongoose');

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log("Database Connected")
};

module.exports = connectDB;