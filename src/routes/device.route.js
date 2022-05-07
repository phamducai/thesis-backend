import express from "express";

import {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
} from "../controllers/device.controller.js";

const router = express.Router();

router.post("/", addDevice);
router.get("/", getAllDevices);
router.get("/:id", getDeviceById);
router.patch("/:id", updateDeviceById);
router.delete("/:id", deleteDeviceById);

export default router;
