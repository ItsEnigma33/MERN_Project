const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const profileModel = require("../../models/Profile");
const profileValidator = require("../../validate/profileValidator");
const educationValidator = require("../../validate/educationValidator");
const experienceValidator = require("../../validate/experienceValidator");
// @route GET /profile/user
// @access private
// @desc Logged User Profie
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileModel
      .findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) // popluate the Joined schema Data in profile Schema (user name , user avatar)
      .then(profile => {
        let errors = {};
        if (profile) {
          res.json(profile);
        } else {
          errors.profile = "Create Profile First";
          res.status(404).json(errors);
        }
      });
  }
);

// @route POST /profile/user
// @access private
// @desc Logged User Profie
router.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileModel.findOne({ user: req.user.id }).then(profile => {
      let { errors, isValid } = profileValidator(req.body);
      console.log(req.body);
      if (!isValid) {
        res.status(400).json(errors);
      } else {
        let userProfile = {};
        let social = {};
        userProfile.user = req.user.id;

        //Checking they arent undefined or null
        if (req.body.company) userProfile.company = req.body.company;
        if (req.body.handle) userProfile.handle = req.body.handle;
        if (req.body.bio) userProfile.bio = req.body.bio;
        if (req.body.website) userProfile.website = req.body.website;
        if (req.body.location) userProfile.location = req.body.location;
        if (req.body.status) userProfile.status = req.body.status;
        if (req.body.gitHubUserName)
          userProfile.gitHubUserName = req.body.gitHubUserName;

        //Skills
        if (req.body.skills) userProfile.skills = req.body.skills.split(",");

        //Social
        if (req.body.facebook) social.facebook = req.body.facebook;
        if (req.body.twitter) social.twitter = req.body.twitter;
        if (req.body.instagram) social.instagram = req.body.instagram;
        if (req.body.linkedIn) social.linkedIn = req.body.linkedIn;
        userProfile.social = social;

        if (profile) {
          // Modify / Update Action
          // Modify In Mongo
          profileModel
            .findOneAndUpdate(
              { user: req.user.id },
              { $set: userProfile },
              { new: true }
            )
            .then(profile => res.json(profile));
        } else {
          //Create  / Add Action
          //Check If handle Exist Already
          profileModel.findOne({ handle: req.body.handle }).then(profile => {
            if (profile) {
              errors.handle = "Handle Exist For user";
              res.send(400).json(errors);
            } else {
              profileModel(userProfile)
                .save()
                .then(resPro => {
                  res.json(resPro);
                })
                .catch(err => {
                  console.log(err);
                  errors.dbError = err.message;
                  res.json(errors);
                });
            }
          });
        }
      }
    });
  }
);

// @route POST /profile/addExperience
// @access private
// @desc add Experience for Logged In User Profie
router.post(
  "/addExperience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileModel.findOne({ user: req.user.id }).then(profile => {
      let { errors, isValid } = experienceValidator(req.body);
      if (!isValid) {
        res.status(400).json(errors);
      } else {
        let experince = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          currentWorking: req.body.currentWorking
        };

        profile.experience.push(experince);

        profile
          .save()
          .then(userProfile => {
            res.json(userProfile);
          })
          .catch(err => {
            errors.dbError = err.message;
            res.json(errors);
          });
      }
    });
  }
);

// @route POST /profile/addEducation
// @access private
// @desc add Education for Logged In User Profie
router.post(
  "/addEducation",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileModel.findOne({ user: req.user.id }).then(profile => {
      let { errors, isValid } = educationValidator(req.body);

      if (!isValid) {
        res.status(400).json(errors);
      } else {
        let education = {
          school: req.body.school,
          highSchool: req.body.highSchool,
          college: req.body.college,
          fieldOfDegree: req.body.fieldOfDegree
        };

        profile.education.push(education);

        profile
          .save()
          .then(userProfile => {
            res.json(userProfile);
          })
          .catch(err => {
            errors.dbError = err.message;
            res.json(errors);
          });
      }
    });
  }
);

// @route GET /profile/user/:user
// @access Public
// @desc Get User Profie By Profile Id
router.get("/user/:user", (req, res) => {
  profileModel
    .findOne({ user: req.params.user })
    .populate("user", ["name", "avatar"]) // popluate the Joined schema Data in profile Schema (user name , user avatar)
    .then(profile => {
      let errors = {};
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json((errors.profile = "No Profile Exist"));
      }
    });
});

// @route GET /profile/handle/:handle
// @access Public
// @desc Get User Profie By handle
router.get("/handle/:handle", (req, res) => {
  profileModel
    .findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"]) // popluate the Joined schema Data in profile Schema (user name , user avatar)
    .then(profile => {
      let errors = {};
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json((errors.profile = "No Profile Exist"));
      }
    });
});

// @route GET /profile/all
// @access Public
// @desc Get All Profie
router.get("/all", (req, res) => {
  profileModel
    .find()
    .populate("user", ["name", "avatar"]) // popluate the Joined schema Data in profile Schema (user name , user avatar)
    .then(profiles => {
      let errors = {};
      if (profiles) {
        res.json(profiles);
      } else {
        errors.profile = "No profiles Exist";
        res.status(404).json(errors);
      }
    })
    .catch(err => {
      errors.dbError = err.message;
      res.status(400).json(errors);
    });
});

module.exports = router;
