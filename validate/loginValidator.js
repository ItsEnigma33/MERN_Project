const isEmptyCheck = require("./isEmptyCheck");
const Validator = require("validator");

const loginValidator = user => {
  let error = {};

  if (isEmptyCheck(user.email)) {
    error.email = "Email is Required";
  } else {
    if (!Validator.isEmail(user.email)) {
      error.email = "Email is In Valid";
    }
  }

  if (isEmptyCheck(user.password)) {
    error.password = "Password is Required";
  }

  return {
    isValid: isEmptyCheck(error),
    errors: error
  };
};

module.exports = loginValidator;
