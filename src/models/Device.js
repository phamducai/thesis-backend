const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  attributes: {
    type: Object,
    default: {},
  },
  refRoom: {
    type: Schema.Types.ObjectId,
    ref: "Story",
  },
});

const DeviceModel = mongoose.model("Device", DeviceSchema);
module.exports = DeviceModel;
