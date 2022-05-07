import mongoose from "mongoose";
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
  // value: {
  //   required: true,
  // },
  // timestamp: {
  //   required: true,
  // },
});

const RecordModel = mongoose.model("Record", RecordSchema);
export default RecordModel;
