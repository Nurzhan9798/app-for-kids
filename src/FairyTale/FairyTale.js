import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FairyTaleSchema = new Schema({
  title: String,
  summary: String,
  content: String,
  coverImg: String,
});

export default model("FairyTale", FairyTaleSchema);
