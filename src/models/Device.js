const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: {
    type: String,
  },
  dev_addr: {
    type: String,
  },

  type: {
    type: String,
  },
  attributes: {
    type: Object,
    default: {},
  },
  refRoom: {
    type: Schema.Types.ObjectId,
    ref: "Story",
  },
  name1: {
    type: String,
  },
  name2: {
    type: String,
  },
});

// Duplicate the ID field.
DeviceSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
DeviceSchema.set("toJSON", {
  virtuals: true,
});

const DeviceModel = mongoose.model("Device", DeviceSchema);

module.exports = DeviceModel;
