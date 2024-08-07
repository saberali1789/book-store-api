const express = require("express");
const logger = require("./middlewares/logger.js");
const { errorHandler, notFound } = require("./middlewares/error.js");
const connectToDB = require("./config/db.js");
const dotenv = require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

connectToDB();

const app = express();

app.use(express.static(path.join(__dirname, "images")));

//Apply Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());

// Set View engine
app.set("view engine", "ejs");

// Routes
app.use("/api/books", require("./routes/books.js"));
app.use("/api/authors", require("./routes/authors.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/upload", require("./routes/upload.js"));
app.use("/password", require("./routes/password.js"));

// Error handler Middleware
app.use(notFound);

app.use(errorHandler);

//Running Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
