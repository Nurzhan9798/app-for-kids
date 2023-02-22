const express = require('express');
const fairyTaleRouter = require('./router/fairy-tale-router');
const app = express();
const cors = require("cors");
const PORT = 3001;
const mongoose = require("mongoose");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/fairy-tale", fairyTaleRouter)
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Hello world!");
})

mongoose.connect(
    "mongodb+srv://admin:xkZK9VZiHDbu0DZC@cluster0.larfxou.mongodb.net/?retryWrites=true&w=majority"
);


app.listen(PORT, () =>{
    console.log("Started");
})