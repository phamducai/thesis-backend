const Model = require("../models/Device");
const mqtt = require("../mqtt");

//all get add device
const addDevice = async (request, response) => {
  const user = request.body;
  console.log(user);
  try {
    const newDevice = new Model(user);
    await newDevice.save();

    response.json(newDevice);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(500);
  }
}; // Get all

const getAllDevices = async (req, res) => {
  const query = req.query;
  try {
    const users = await Model.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a  by id
const getDeviceById = async (request, response) => {
  try {
    const user = await Model.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of edited  in the database
const updateDeviceById = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  console.log(id);

  try {
    await Model.updateOne({ _id: id }, updates);
    mqtt.publish("mybk/down", JSON.stringify(updates));
    console.log(updates);
    return res.sendStatus(200);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteDeviceById = async (request, response) => {
  const id = request.params.id;
  const message = { action: "command", command: "leave_req", dev_addr: id };
  console.log(message);
  try {
    mqtt.publish("mybk/down", JSON.stringify(message));
    await Model.deleteOne({ dev_addr: id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
const device = {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
};

module.exports = device;
