const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  const user = new User({ username });

  try {
    const registedUser = await User.register(user, password);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(400);
  }
});

module.exports = router;
