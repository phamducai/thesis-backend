import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  name: { type: String, required: true },
});

const RoomModel = mongoose.model("rooms", RoomSchema);
export default RoomModel;
