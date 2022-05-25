const express = require("express");
const router = express.Router();
const mqtt = require("../mqtt");
const device = require("../controllers/device.controller");

router.post("/", device.addDevice);
router.get("/", device.getAllDevices);
router.get("/add", async (req, res) => {
  const message = { action: "command", command: "permit_join" };

  try {
    mqtt.publish("mybk/down", JSON.stringify(message));
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

router.post("/:id/command", device.sendCommand);

router.get("/:id", device.getDeviceById);
router.patch("/:id", device.updateDeviceById);
router.delete("/:id", device.deleteDeviceById);

module.exports = router;
