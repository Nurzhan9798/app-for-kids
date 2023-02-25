import Router from "express";
import multer from "multer";
import TrackController from "./TrackController.js";

const router = new Router();
const audioUpload = multer({ dest: "uploads/audios" });

router.get("/", TrackController.getAll);
router.get("/:id", TrackController.get);
router.post("/", audioUpload.single("audioFile"), TrackController.create);
router.put("/", audioUpload.single("audioFile"), TrackController.update);
router.delete("/:id", TrackController.delete);

export default router;
