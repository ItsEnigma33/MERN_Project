const mongoose = require("mongoose");
const JwtStartergy = require("passport-jwt").Strategy;
const JwtExtract = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const UserModal = mongoose.model("users");

const options = {};
option.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
options.key = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStartergy(options, (json_payload, done) => {
      UserModal.findById(json_payload.id).then(user => {
        if (!user) done(null, false);
        else done(null, user);
      });
    })
  );
};
