import { Schema, model } from "mongoose";

const TrackSchema = new Schema({
  title: String,
  author: String,
  audioFile: String,
  listen: Number,
});

export default model("Track", TrackSchema);
