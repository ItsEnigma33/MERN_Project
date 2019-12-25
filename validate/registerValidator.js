const Validator = require("validator");
const isEmptyCheck = require("./isEmptyCheck");

const registerValidator = data => {
  let errors = {};

  let name = isEmptyCheck(data.name) ? "" : data.name;
  let email = isEmptyCheck(data.email) ? "" : data.email;
  let password = isEmptyCheck(data.password) ? "" : data.password;
  let password2 = isEmptyCheck(data.password2) ? "" : data.password2;

  if (Validator.isEmpty(name)) {
    errors.name = "User Name Is Required";
  }

  if (!Validator.isLength(name, { min: 2, max: 50 })) {
    errors.name = "User Name Should Be Between 2 To 50 Characters";
  }

  if (Validator.isEmpty(email)) {
    errors.name = "User Email Is Required";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "User Email Is Invalid";
  }

  if (Validator.isEmpty(password)) {
    errors.name = "User Password Is Required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.name = "User Name Should Be Between 6 To 30 Characters";
  }

  if (!Validator.equals(password, password2)) {
    errors.name = "Password Needs To be Match";
  }

  return {
    errors,
    isValid: isEmptyCheck(errors)
  };
};

module.exports = registerValidator;
