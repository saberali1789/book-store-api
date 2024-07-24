const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

/**
 * @desc  Get all books
 * @route   /api/books
 * @method  Get
 * @access  puplic
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }

  res.status(200).json(books);
});

/**
 * @desc  Get book by id
 * @route   /api/books/:id
 * @method  Get
 * @access  puplic
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    console.log(req.params);
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc  Create a new book
 * @route   /api/books
 * @method  POST
 * @access  private // only admin
 */
const creatBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const bookSended = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await bookSended.save();
  res.status(201).json(result);
});

/**
 * @desc  Update a book
 * @route   /api/books/:id
 * @method  PUT
 * @access  private // only admin
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  error && res.status(400).json({ message: error.details[0].message });

  const bookUpdate = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  res.status(200).json(bookUpdate);
});

/**
 * @desc  Delete a book
 * @route   /api/books/:id
 * @method  DELETE
 * @access  private // only admin
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book has been Deleted" });
  } else {
    res.status(404).json({ message: "Book not Found" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  creatBook,
  updateBook,
  deleteBook,
};
