const express = require("express");
const router = express.Router();
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

// const books = [
//   {
//     id: 1,
//     title: "Black Swan",
//     author: "Nassim Nicholas Taleb",
//     description: "About Black Swan",
//     price: 10,
//     cover: "soft cover",
//   },
//   {
//     id: 2,
//     title: "Skin In The Game",
//     author: "Nassim Nicholas Taleb",
//     description: "About Skin In The Game",
//     price: 12,
//     cover: "soft cover",
//   },
//   // {
//   //   id: 2,
//   //   "title": "Skin In The Game",
//   //   "author": "Nassim Nicholas Taleb",
//   //   "description": "About Skin In The Game",
//   //   "price": "12",
//   //   "cover": "soft cover",
//   // },
// ];

/**
 * @desc  Get all books
 * @route   /api/books
 * @method  Get
 * @access  puplic
 */
// router.get("/", (req, res) => {
//   res.send("Hello Node");
// });

/**
 * @desc  Get all books
 * @route   /api/books
 * @method  Get
 * @access  puplic
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate('author',['_id', 'firstName', 'lastName' ]);
    res.status(200).json(books);
  })
);

/**
 * @desc  Get book by id
 * @route   /api/books/:id
 * @method  Get
 * @access  puplic
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author');
    if (book) {
      console.log(req.params);
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  })
);

/**
 * @desc  Create a new book
 * @route   /api/books
 * @method  POST
 * @access  puplic
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
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
  })
);

/**
 * @desc  Update a book
 * @route   /api/books/:id
 * @method  PUT
 * @access  puplic
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
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
  })
);

/**
 * @desc  Delete a book
 * @route   /api/books/:id
 * @method  DELETE
 * @access  puplic
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Book has been Deleted" });
    } else {
      res.status(404).json({ message: "Book not Found" });
    }
  })
);

module.exports = router;
