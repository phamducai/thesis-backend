import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    autoIndex: true,
    timestamps: true,
  }
);

const userModel = mongoose.model("users", UserSchema);
export default userModel;
