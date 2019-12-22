const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const profileModel = mongoose.model("profile");

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
          res.status(404).json((errors.profile = "Create Profile First"));
        }
      });
  }
);

// @route POST /profile/user
// @access private
// @desc Logged User Profie
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileModel.findOne({ user: req.user.id }).then(profile => {
      let errors = {};
      let userProfile = {};
      let social = {};
      userProfile.user = req.user.id;

      //Checking they arent undefined or null
      if (req.body.company) userProfile.company = req.body.company;
      if (req.body.handle) userProfile.handle = req.body.handle;
      if (req.body.bio) userProfile.bio = req.body.bio;
      if (req.body.website) userProfile.website = req.body.website;
      if (req.body.location) userProfile.location = req.body.location;
      if (req.body.status) userProfile.company = req.body.company;
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
        res.json(profile);
      } else {
        //Create  / Add Action
        //Check If handle Exist Already
        profileModel.findOne({ handle: req.body.handle }).then(profile => {
          if (profile) {
            res.send(400).json((errors.handle = "Handle Exist For user"));
          } else {
            res.json(profile);
          }
        });
      }
    });
  }
);

module.exports = router;
