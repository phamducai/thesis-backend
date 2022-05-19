const express = require("express");
require("dotenv").config();

const cors = require("cors");
const morganLogger = require("morgan");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morganLogger("dev"));

const sessionConfig = {
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  resave: false,
  saveUninitialized: false,
  secret: "topsecret",
};
app.use(require("express-session")(sessionConfig));

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/User");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/building", require("./routes/building.route"));
app.use("/room", require("./routes/room.route"));
app.use("/device", require("./routes/device.route"));
app.use("/record", require("./routes/record.route"));

app.use("/auth", require("./routes/auth.route"));
app.use("/user", require("./routes/user.route"));

module.exports = app;
