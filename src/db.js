const mongoose = require("mongoose");

const Connectiondb = async () => {
  const URL = "mongodb://localhost";

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = Connectiondb;
