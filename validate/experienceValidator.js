const Validator = require("validator");
const isEmptyCheck = require("./isEmptyCheck");

const experienceValidator = data => {
  let errors = {};

  //Required
  let title = isEmptyCheck(data.title) ? "" : data.title;
  let company = isEmptyCheck(data.company) ? "" : data.company;
  let from = isEmptyCheck(data.from) ? "" : data.from;

  if (Validator.isEmpty(title)) {
    errors.title = "Title Is Required";
  }

  if (Validator.isEmpty(company)) {
    errors.company = "Company Is Required";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "From Date Is Required";
  }

  return {
    errors,
    isValid: isEmptyCheck(errors)
  };
};

module.exports = experienceValidator;
