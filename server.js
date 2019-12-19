const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys");
const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const dashboard = require("./routes/api/dashboard");
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
app.use(passport.intialize());

require("./config/passport")(passport);

//API'S
app.use("/user", user);
app.use("/profile", profile);
app.use("/dashboard", dashboard);

let port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on Port " + port));
