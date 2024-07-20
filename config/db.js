const mongoose = require("mongoose");

// Cnonect To Database
async function connectToDB() {
  try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection with Mongo");
  } catch (error) {
    console.log("Faild to Connect to Mongo", error);
  }
}

module.exports = connectToDB;
/*
//Old method
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection with Mongo"))
  .catch((error) => console.log("Faild to Connect to Mongo", error));
*/
