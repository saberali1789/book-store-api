const express = require("express");
const bookPath = require("./routes/books.js");
const authorsPath = require("./routes/authors.js");
const mongoose = require("mongoose");

// Cnonect To Database
mongoose
  .connect("mongodb://127.0.0.1/bookStoreDB")
  .then(() => console.log("Connection with Mongo"))
  .catch((error) => console.log("Faild to Connect to Mongo", error));

const app = express();

//Apply Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookPath);
app.use("/api/authors", authorsPath);

//Running Server
const PORT = 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
