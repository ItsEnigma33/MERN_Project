const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const PostModel = require("../../models/Post");
const ProfileModel = mongoose.model("profile");
const validatePost = require("../../validate/postValidator");
const passport = require("passport");

// @route POST /post/add
// @access private
// @desc Add New Post
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, empty } = validatePost(req.body);

    if (!empty) {
      return res.status(400).json(errors);
    }

    const post = new PostModel({
      user: req.body.userId,
      text: req.body.text,
      comment: [],
      likes: [],
      name: req.body.name,
      avatar: req.body.avatar
    });

    post
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        errors.dbError = err.message;
        res.status(400).json(errors);
      });
  }
);

// @route DELETE /post/delete/:id
// @access private
// @desc Delete Post
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    ProfileModel.findOne({ user: req.user.id })
      .then(profile => {
        if (req.user.id !== profile.user.toString()) {
          errors.user = "Access Denied";
          return res.status(401).json(errors);
        }
        PostModel.findById(req.params.id)
          .then(post => {
            post
              .remove()
              .then(() => res.json({ action: "Success" }))
              .catch(err => {
                errors.dbError = err.message;
                res.status(500).json(errors);
              });
          })
          .catch(err => {
            errors.post = "Post Not Found!";
            res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.dbError = err.message;
        res.status(500).json(errors);
      });
  }
);

// @route GET /post/all
// @access public
// @desc Get All Post
router.get("/all", (req, res) => {
  let errors = {};
  PostModel.find()
    .sort({ date: -1 })
    .populate("user", ["name", "avatar"])
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      errors.dbError = err.message;
      res.status(404).json(errors);
    });
});

// @route GET /post/:id
// @access public
// @desc Get Post By Id
router.get("/:id", (req, res) => {
  let errors = {};
  PostModel.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      errors.post = "Post Not Found!";
      res.status(404).json(errors);
    });
});

// @route POST /post/like/:id
// @access private
// @desc like Post
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    ProfileModel.findOne({ user: req.user.id }).then(profile => {
      //Get Post From Id
      PostModel.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => {
              return like.user.toString() == req.user.id;
            }).length > 0
          ) {
            errors.post = "Already Liked This Post";
            return res.status(400).json(errors);
          } else {
            const likeObject = {
              user: req.user.id
            };
            post.likes.push(likeObject);

            post
              .save()
              .then(post => {
                res.json(post);
              })
              .catch(err => {
                errors.dbError = "Something Went Wrong";
                res.status(500).json(errors);
              });
          }
        })
        .catch(err => {
          console.log(err);
          errors.post = "Post Not Found";
          res.status(404).json(errors);
        });
    });
  }
);

// @route POST /post/unlike/:id
// @access private
// @desc unlike Post
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    ProfileModel.findOne({ user: req.user.id }).then(profile => {
      //Get Post From Id
      PostModel.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() == req.user.id)
              .length > 0
          ) {
            post.likes = post.likes.filter(
              like => like.user.toString() !== req.user.id
            );

            post
              .save()
              .then(post => {
                res.json(post);
              })
              .catch(err => {
                errors.dbError = "Something Went Wrong";
                res.status(500).json(errors);
              });
          } else {
            errors.post = "First Like This Post";
            return res.status(400).json(errors);
          }
        })
        .catch(err => {
          errors.post = "Post Not Found";
          res.status(404).json(errors);
        });
    });
  }
);

// @route POST /post/comment/add/:id
// @access private
// @desc Add New Comment
router.post(
  "/comment/add/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, empty } = validatePost(req.body);

    if (!empty) {
      return res.status(400).json(errors);
    }

    PostModel.findById(req.params.id)
      .then(post => {
        const commentObject = {
          user: req.user.id,
          name: req.body.name,
          avatar: req.body.avatar,
          text: req.body.text
        };

        post.comment.unshift(commentObject);
        post
          .save()
          .then(post => {
            res.json(post);
          })
          .catch(err => {
            errors.comment = "Something went Wrong";
            res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.post = "Not Found";
        res.status(404).json(errors);
      });
  }
);

// @route DELETE /post/comment/delete/:id/:commentId
// @access private
// @desc Delete Comment
router.delete(
  "/comment/delete/:id/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    PostModel.findById(req.params.id)
      .then(post => {
        //If Post Exist
        if (
          post.comment.filter(
            com => com._id.toString() === req.params.commentId
          ).length === 0
        ) {
          errors.comment = "Comment Does'nt Exist";
          return res.status(404).json(errors);
        }

        post.comment = post.comment.filter(
          com => com._id.toString() !== req.params.commentId
        );

        post
          .save()
          .then(post => {
            res.json(post);
          })
          .catch(err => {
            errors.comment = "Something went Wrong";
            res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.post = "Not Found";
        res.status(404).json(errors);
      });
  }
);

module.exports = router;
