const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  {
    id: 1,
    title: "Black Swan",
    author: "Nassim Nicholas Taleb",
    description: "About Black Swan",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "Skin In The Game",
    author: "Nassim Nicholas Taleb",
    description: "About Skin In The Game",
    price: 12,
    cover: "soft cover",
  },
  // {
  //   id: 2,
  //   "title": "Skin In The Game",
  //   "author": "Nassim Nicholas Taleb",
  //   "description": "About Skin In The Game",
  //   "price": "12",
  //   "cover": "soft cover",
  // },
];

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

router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc  Get book by id
 * @route   /api/books/:id
 * @method  Get
 * @access  puplic
 */
router.get("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
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
 * @access  puplic
 */
router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const bookSended = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };
  books.push(bookSended);
  res.status(201).json(bookSended);
});

/**
 * @desc  Update a book
 * @route   /api/books/:id
 * @method  PUT
 * @access  puplic
 */
router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  error && res.status(400).json({ message: error.details[0].message });

  const book = books.find((book) => book.id === parseInt(req.params.id));
  book
    ? res.status(200).json({ message: "Book has been updated" })
    : res.status(404).json({ message: "Book doesn't update" });
});


/**
 * @desc  Delete a book
 * @route   /api/books/:id
 * @method  DELETE
 * @access  puplic
 */
router.delete("/:id", (req, res) => {

  const book = books.find((book) => book.id === parseInt(req.params.id));
  book
    ? res.status(200).json({ message: "Book has been Deleted" })
    : res.status(404).json({ message: "Book not Found" });
});

// Validate Create book
function validateCreateBook(obj) {
  const schema = Joi.object({
  
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });

  return schema.validate(obj);
}
// Validate Update book
function validateUpdateBook(obj) {
  const schema = Joi.object({
   
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string().trim().min(3).max(200),
    description: Joi.string().trim().min(3).max(500),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
  });

  return schema.validate(obj);
}
module.exports = router;
