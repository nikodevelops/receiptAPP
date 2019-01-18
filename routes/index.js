var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");

router.get("/dashboard", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("dashboard", { user: req.user });
  } else {
    res.render("login");
  }
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/dashboard");
    } else {
      passport.authenticate("local")(req, res, function() {
        console.log("You are now logged in as: " + req.body.username);
        res.redirect("/dashboard");
      });
    }
  });
});

module.exports = router;
