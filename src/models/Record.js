const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
  },
  attribute: {
    type: String,
    required: true,
  },
  sample: {
    type: Object,
  },
});

const RecordModel = mongoose.model("Record", RecordSchema);
module.exports = RecordModel;
