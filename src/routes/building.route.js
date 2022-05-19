const express = require("express");
const router = express.Router();

const Building = require("../models/Building");

router.post("/", async (req, res) => {
  try {
    const newRoom = new Building(req.body);
    await newRoom.save();

    return res.json(newRoom);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Building.find();
    return res.json(result);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Building.findById(req.params.id);
    return res.json(result);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  console.log(updates);
  try {
    const result = await Building.updateOne({ _id: id }, updates);
    console.log(result);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  const roomId = req.params.id;
  try {
    await Building.deleteOne({ _id: roomId });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

module.exports = router;
