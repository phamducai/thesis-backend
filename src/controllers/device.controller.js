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
    console.log(error);
    return res.sendStatus(400);
  }
};

// Get a  by id
const getDeviceById = async (request, response) => {
  try {
    const user = await Model.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Save data of edited  in the database
const updateDeviceById = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  console.log(req.body);

  try {
    await Model.updateOne({ _id: id }, updates);
    mqtt.publish("mybk/down", JSON.stringify(updates));
    console.log(updates);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const deleteDeviceById = async (request, response) => {
  const id = request.params.id;
  let foundDevice = await Model.findById(id);
  const message = {
    action: "command",
    command: "leave_req",
    dev_addr: foundDevice.dev_addr,
  };
  console.log(message);
  try {
    mqtt.publish("mybk/down", JSON.stringify(message));

    await Model.deleteOne({ _id: id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const sendCommand = async (req, res) => {
  const { id } = req.params;
  const commandObject = req.body;

  try {
    let foundDevice = await Model.findById(id);

    if (!foundDevice) return res.sendStatus(200);

    const msgObj = {
      ...commandObject,
      action: "command",
      dev_addr: foundDevice.dev_addr,
    };
    console.log(msgObj);

    mqtt.publish("mybk/down", JSON.stringify(msgObj));

    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(400);
  }
};
const device = {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
  sendCommand,
};

module.exports = device;
