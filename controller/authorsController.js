const asyncHandler = require("express-async-handler");
const {
  Author,
  validateUpdateAuthor,
  validateCreateAuthor,
} = require("../models/Authors");

/**
 * @desc  Get all Authors
 * @route   /api/authors
 * @method  Get
 * @access  puplic
 */
const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorPage = 2;
  if (pageNumber) {
    const authorsList = await Author.find()
      .skip((pageNumber - 1) * authorPage)
      .limit(authorPage);
    res.status(200).json(authorsList);
  }

  const authorsList = await Author.find();
  res.status(200).json(authorsList);
});

/**
 * @desc  Get Authors by Id
 * @route   /api/authors
 * @method  Get
 * @access  puplic
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.status(200).json(author);
});

/**
 * @desc  Create a new author
 * @route   /api/authors
 * @method  POST
 * @access  private // only admins can create authors
 */
const createAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const authorSended = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });

  const result = await authorSended.save();
  res.status(201).json(result);
});

/**
 * @desc  Update author by ID
 * @route   /api/authors
 * @method  PUT
 * @access  private // only admins
 */
const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  );

  res.status(200).json(author);
});

/**
 * @desc  Delete an author
 * @route   /api/author/:id
 * @method  DELETE
 * @access  private // only admins can delete
 */
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author has been Deleted" });
  } else {
    res.status(404).json({ message: "Author not Found" });
  }
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
