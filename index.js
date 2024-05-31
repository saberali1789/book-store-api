const express = require("express");
const bookPath = require("./routes/books.js");
const authorsPath = require("./routes/authors.js");
const mongoose = require("mongoose");
const dotenv= require('dotenv')
dotenv.config()
// Cnonect To Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection with Mongo"))
  .catch((error) => console.log("Faild to Connect to Mongo", error));

const app = express();

//Apply Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookPath);
app.use("/api/authors", authorsPath);

//Running Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
