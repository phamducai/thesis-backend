const express =require("express") ;
const router = express.Router();

const device = require('../controllers/device.controller');


router.post("/", device.addDevice);
router.get("/", device.getAllDevices);
router.get("/:id", device.getDeviceById);
router.patch("/:id", device.updateDeviceById);
router.delete("/:id", device.deleteDeviceById);

module.exports= router;
