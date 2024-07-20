const express = require("express");

const logger = require("./middlewares/logger.js");
const { errorHandler, notFound } = require('./middlewares/error.js')
const connectToDB = require("./config/db.js");
const dotenv = require("dotenv").config();

connectToDB()

const app = express();

//Apply Middleware
app.use(express.json());

app.use(logger);

// Routes
app.use("/api/books", require("./routes/books.js"));
app.use("/api/authors", require("./routes/authors.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/users", require("./routes/users.js"));

// Error handler Middleware
app.use(notFound);

app.use(errorHandler)

//Running Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
