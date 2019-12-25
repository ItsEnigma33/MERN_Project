const Validator = require("validator");
const isEmptyCheck = require("./isEmptyCheck");

const profileValidator = data => {
  let errors = {};

  //Required
  let handle = isEmptyCheck(data.handle) ? "" : data.handle;
  let skills = isEmptyCheck(data.skills) ? "" : data.skills;
  let status = isEmptyCheck(data.status) ? "" : data.status;

  let company = isEmptyCheck(data.company) ? "" : data.company;
  let bio = isEmptyCheck(data.bio) ? "" : data.bio;
  let website = isEmptyCheck(data.website) ? "" : data.website;
  let location = isEmptyCheck(data.location) ? "" : data.location;
  let gitHubUserName = isEmptyCheck(data.gitHubUserName)
    ? ""
    : data.gitHubUserName;

  let facebook = isEmptyCheck(data.facebook) ? "" : data.facebook;
  let linkedIn = isEmptyCheck(data.linkedIn) ? "" : data.linkedIn;
  let instagram = isEmptyCheck(data.instagram) ? "" : data.instagram;
  let twitter = isEmptyCheck(data.twitter) ? "" : data.twitter;

  if (Validator.isEmpty(handle)) {
    errors.handle = "handle Is Required";
  }

  if (!Validator.isLength(handle, { min: 4, max: 40 })) {
    errors.handle = "Handle Should Be Between 4 To 40 Characters";
  }

  if (Validator.isEmpty(skills)) {
    errors.skills = "Skills Is Required";
  }

  if (Validator.isEmpty(status)) {
    errors.status = "Status Is Required";
  }

  if (!Validator.isEmpty(website)) {
    if (!Validator.isURL(website)) {
      errors.website = "Website is Invalid";
    }
  }

  if (!Validator.isEmpty(twitter)) {
    if (!Validator.isURL(twitter)) {
      errors.twitter = "Website is Invalid";
    }
  }

  if (!Validator.isEmpty(facebook)) {
    if (!Validator.isURL(facebook)) {
      errors.facebook = "Website is Invalid";
    }
  }

  if (!Validator.isEmpty(linkedIn)) {
    if (!Validator.isURL(linkedIn)) {
      errors.linkedIn = "Website is Invalid";
    }
  }

  if (!Validator.isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = "Website is Invalid";
    }
  }

  return {
    errors,
    isValid: isEmptyCheck(errors)
  };
};

module.exports = profileValidator;
