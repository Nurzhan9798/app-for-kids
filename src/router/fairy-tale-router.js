const express = require('express');
const router = express.Router();
const FairyTale = require('../models/FairyTale');
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");

router.get('/', async (req, res) => {
    res.json(await FairyTale.find());
})

router.post('/', upload.single("coverImg"), async (req, res) => {
    console.log(req.file);
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const {
        title,
        summary,
        content,
    } = req.body;
    try {
        const fairyTaleDoc = await FairyTale.create({
            title: title,
            summary: summary,
            content: content,
            coverImg: newPath
        });
        res.json(fairyTaleDoc);
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.get('/:fairyTaleId', async (req, res) => {
    const { fairyTaleId: id } = req.params;
    res.json(await FairyTale.findById(id))
})

router.put('/',upload.single("coverImg"), async (req, res) => {
    console.log(req.file);
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const {
        title,
        summary,
        content,
        _id
    } = req.body;
    try {
        const fairyTaleDoc = await FairyTale.findByIdAndUpdate(_id, {
            title: title,
            summary: summary,
            content: content,
            coverImg: newPath
        });
        res.json('updated')
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.delete('/:fairyTaleId', async (req, res) => {
    const { fairyTaleId: id } = req.params;
    const fairyTaleDoc = await FairyTale.findByIdAndDelete(id);
    res.json('deleted')
})
module.exports = router;
