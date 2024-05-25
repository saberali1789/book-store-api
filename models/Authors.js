const mongoose = require("mongoose");
const Joi = require("joi");


const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", AuthorSchema);

// Validate Create a new Author
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(100).required(),
    lastName: Joi.string().trim().min(3).max(100).required(),
    nationality: Joi.string().trim().min(3).max(50).required(),
    image: Joi.string().trim().min(5).max(200),
  });

  return schema.validate(obj);
}
// Validate Update Author
function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(100),
    lastName: Joi.string().trim().min(3).max(100),
    nationality: Joi.string().trim().min(3).max(50),
    image: Joi.string().trim().min(5).max(200),
  });

  return schema.validate(obj);
}

module.exports = {
  Author,
  validateUpdateAuthor,
  validateCreateAuthor,
};
