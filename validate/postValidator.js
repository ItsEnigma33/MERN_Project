const Validator = require("validator");
const isEmpty = require("./isEmptyCheck");

const validatePost = post => {
  let errors = {};
  post.text = isEmpty(post.text) ? "" : post.text;

  if (Validator.isEmpty(post.text)) {
    errors.text = "Post Text Is Required";
  }

  return {
    errors: errors,
    empty: isEmpty(errors)
  };
};

module.exports = validatePost;
