const { Book } = require("./models/Book");
const { books } = require("./data");
const { Author } = require("./models/Authors");
const { authors } = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();

connectToDB();

// insert many books to database
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books inserted successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// remove all books from the database
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books deleted successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// insert many books to database
const importAuthor = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Author inserted successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// remove all books from the database
const removeAuthor = async () => {
  try {
    await Author.deleteMany();
    console.log("Author deleted successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-insert") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
} else if (process.argv[2] === "-import-author") {
  importAuthor();
}
