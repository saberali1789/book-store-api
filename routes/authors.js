const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controller/authorsController");

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.post("/", verifyTokenAndAdmin, createAuthor);

router.put("/:id", verifyTokenAndAdmin, updateAuthor);

router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
