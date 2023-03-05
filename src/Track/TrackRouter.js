import Router from "express";
import multer from "multer";
import TrackController from "./TrackController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = new Router();
const audioUpload = multer({ dest: "uploads/audios" });

router.get("/", AuthMiddleware.checkToken, TrackController.getAll);
router.get("/:id", TrackController.get);
router.post(
  "/",
  AuthMiddleware.checkToken,
  audioUpload.single("audioFile"),
  TrackController.create
);
router.put(
  "/",
  AuthMiddleware.checkToken,
  audioUpload.single("audioFile"),
  TrackController.update
);
router.delete("/:id", AuthMiddleware.checkToken, TrackController.delete);

export default router;
