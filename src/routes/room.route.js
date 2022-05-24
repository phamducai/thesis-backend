const express = require("express");
const router = express.Router();
const room = require("../controllers/room.controller");
router.post("/", room.addRoom);
router.get("/", room.getAllRooms);
router.get("/:id", room.getRoomById);
router.patch("/:id", room.updateRoomById);
router.delete("/:id", room.deleteRoomById);

module.exports = router;
