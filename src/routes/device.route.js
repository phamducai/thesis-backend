const express = require("express");
const router = express.Router();
const mqtt = require("../mqtt");
const device = require("../controllers/device.controller");

router.post("/", device.addDevice);
router.get("/", device.getAllDevices);
router.get("/:id", device.getDeviceById);
router.patch("/:id", device.updateDeviceById);
router.delete("/:id", device.deleteDeviceById);

router.post("/add", async (req, res) => {
  const message = { action: "command", command: "permit_join" };
  console.log(message);
  try {
    mqtt.publish("/down", JSON.stringify(message));
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

module.exports = router;
