import express from "express";

import {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/", addRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.patch("/:id", updateRoomById);
router.delete("/:id", deleteRoomById);

export default router;
