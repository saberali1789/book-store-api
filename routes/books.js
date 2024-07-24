const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllBooks,
  getBookById,
  creatBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

// router.get("/", (req, res) => {
//   res.send("Hello Node");
// });

router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, creatBook);

router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;
