const RoomModel = require("../models/Room");
// const DeviceModel = require("../models/Device");

//all get add room
const addRoom = async (request, response) => {
  const user = request.body;

  console.log(user);

  try {
    const newRoom = new RoomModel(user);
    await newRoom.save();

    response.json(newRoom);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(500);
  }
}; // Get all

const getAllRooms = async (request, response) => {
  try {
    const users = await RoomModel.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
// Get a  by id
const getRoomById = async (request, response) => {
  try {
    const user = await RoomModel.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
// Save data of edited  in the database
const updateRoomById = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    await RoomModel.updateOne({ _id: id }, updates);
    return res.sendStatus(200);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// deleting data of  from the database
const deleteRoomById = async (req, res) => {
  const roomId = req.params.id;
  try {
    await RoomModel.deleteOne({ _id: roomId });
    // await DeviceModel.deleteMany({ refRoom: roomId });
    await res.status(201).json("User deleted Successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const room = {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};

module.exports = room;
