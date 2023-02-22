const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const FairyTaleSchema = new Schema(
    {
        title: String,
        summary: String,
        content: String,
        coverImg: String
    }
);

const FairyTaleModel = model("FairyTale", FairyTaleSchema);

module.exports = FairyTaleModel;