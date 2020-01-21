const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys");
const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const bodyParser = require("body-parser");
const passport = require("passport");

//DB Connection
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("DB Connected!!");
  })
  .catch(err => {
    console.log("::ERROR OCCURED :: " + err.message);
  });

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());

require("./config/passport")(passport);

//API'S
app.use("/user", user);
app.use("/profile", profile);
app.use("/post", post);

// Serve Client To Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on Port " + port));
