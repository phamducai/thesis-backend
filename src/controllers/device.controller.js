import Model from "../models/Device.js";

//all get add device
export const addDevice = async (request, response) => {
  const user = request.body;

  try {
    const newDevice = new Model(user);
    await newDevice.save();

    response.json(newDevice);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(500);
  }
}; // Get all

export const getAllDevices = async (req, res) => {
  const query = req.query;
  try {
    const users = await Model.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a  by id
export const getDeviceById = async (request, response) => {
  try {
    const user = await Model.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of edited  in the database
export const updateDeviceById = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  console.log(updates)
  try {
    // mqtt.publish("",JSON.stringify(updates))
    await Model.updateOne({ _id: id }, updates);
    return res.sendStatus(200);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteDeviceById = async (request, response) => {
  try {
    await Model.deleteOne({ _id: request.params.id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
