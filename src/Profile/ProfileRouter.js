import Router from "express";
import multer from "multer";
import ProfileController from "./ProfileController.js";

const router = new Router();
const imageUpload = multer({ dest: "uploads/images" });

router.get("/", ProfileController.getAll);
router.get("/:id", ProfileController.get);
router.post("/", imageUpload.single("avatarImg"), ProfileController.create);
router.put("/", imageUpload.single("avatarImg"), ProfileController.update);
router.delete("/:id", ProfileController.delete);

export default router;
