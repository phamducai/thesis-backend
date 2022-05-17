const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  //Relay3channels
  name1: String,
  name2: String,
  type: {
    type: String,
    required: true,
  },
  attributes: {
    type: Object,
    default: {},
  },
  //relayade
  status: { type: Boolean, default: false },
  //relay3 channels
  status1: { type: Boolean, default: false },
  status2: { type: Boolean, default: false },
  status3: { type: Boolean, default: false },
  refRoom: { type: Schema.Types.ObjectId, ref: "Story" },
});

const DeviceModel = mongoose.model("Device", DeviceSchema);
module.exports = DeviceModel;
