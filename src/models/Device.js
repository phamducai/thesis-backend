const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: {
    type: String,
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

  //e viet
  dev_addr: { type: String, unique: true, require: true },
  name1: String,
  name2: String,
  status: Boolean,
  status1: String,
  status2: String,
  status3: String,
});

const DeviceModel = mongoose.model("Device", DeviceSchema);
module.exports = DeviceModel;
