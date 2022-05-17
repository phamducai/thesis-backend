const express = require("express");
const router = express.Router();
const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.sendStatus(400);
};

router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;
  return res.send({ _id: user._id, username: user.username });
});

router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) return res.json(null);

  const user = req.user;
  return res.json({ _id: user._id, username: user.username });
});

router.get("/logout", isAuthenticated, (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

// logout

module.exports = router;
