const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  name: { type: String, required: true },
  refRelayAde: {
    type: Schema.Types.ObjectId,
    ref: "Device",
  },
});

const RoomModel = mongoose.model("rooms", RoomSchema);
module.exports = RoomModel;
