import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  name: String,
  phoneNumber: String,
  age: Number,
  avatarImg: String,
});

export default model("Profile", ProfileSchema);
