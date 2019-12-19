const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

// @route GET /user/test
// @access Public
// @desc To test User
router.get("/test", (req, res) => res.json({ user: "allowed" }));

// @route GET /user/register
// @access Public
// @desc To Add New User
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(400).json({ message: "Email is Already Register" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Avatar Size
          r: "pg", //Rating
          d: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrpyt.genSalt(10, (err, salt) => {
          bcrpyt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
          });
        });

        newUser
          .save()
          .then(userRes => {
            res.send().json(userRes);
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// @route GET /user/login
// @access Public
// @desc To Login User
router.post("/", (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  User.findOne({ email: userEmail }).then(usr => {
    if (!usr) {
      return res.status(404).json({ error: "User Not Found" });
    }

    bcrpyt.compare(password, usr.password).then(isMatch => {
      if (!sMatch) return res.status(400).json("Incorrect Passward");
      //Generate json Web Token For Verification
      const userPayload = { id: usr.id, name: usr.name, avatar: ust.avatar };
      // JWT Key Sign
      jwt.sign(
        userPayload,
        key.secretOrKey,
        { expiresIn: 3600 },
        (error, token) => {
          res.json({
            message: "Login Successful",
            token: "Bearer " + token
          });
        }
      );
    });
  });
});

// @route GET /user/current
// @access Private
// @desc To Current Logged In User
router.get(
  "/curret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
