import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import FairyTaleRouter from "./FairyTale/FairyTaleRouter.js";
import TrackRouter from "./Track/TrackRouter.js";

const app = express();
const PORT = 3001;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/fairy-tale", FairyTaleRouter);
app.use("/track", TrackRouter);
app.use("/images", express.static("uploads/images"));
app.use("/audios", express.static("uploads/audios"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

mongoose.connect(
  "mongodb+srv://admin:xkZK9VZiHDbu0DZC@cluster0.larfxou.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(PORT, () => {
  console.log("Started");
});
