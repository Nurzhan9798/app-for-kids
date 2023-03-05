import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: Number,
  avatarImg: String,
});

export default model("Profile", ProfileSchema);
