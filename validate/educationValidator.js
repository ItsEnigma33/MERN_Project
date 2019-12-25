const Validator = require("validator");
const isEmptyCheck = require("./isEmptyCheck");

const educationValidator = data => {
  let errors = {};

  let school = isEmptyCheck(data.school) ? "" : data.school;
  let highSchool = isEmptyCheck(data.highSchool) ? "" : data.highSchool;
  let college = isEmptyCheck(data.college) ? "" : data.college;
  let fieldOfDegree = isEmptyCheck(data.fieldOfDegree)
    ? ""
    : data.fieldOfDegree;

  //No validion yet

  return {
    errors,
    isValid: isEmptyCheck(errors)
  };
};

module.exports = educationValidator;
