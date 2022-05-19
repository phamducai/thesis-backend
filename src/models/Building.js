const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  refRelayAde: {
    type: Schema.Types.ObjectId,
    ref: "Device",
  },
});

const BuildingModel = mongoose.model("buildings", BuildingSchema);

module.exports = BuildingModel;
