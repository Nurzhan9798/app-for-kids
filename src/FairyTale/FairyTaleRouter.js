import Router from "express";
import multer from "multer";
import FairyTaleController from "./FairyTaleController.js";

const router = new Router();
const imageUpload = multer({ dest: "uploads/images" });

router.get("/", FairyTaleController.getAll);
router.get("/:id", FairyTaleController.get);
router.post("/", imageUpload.single("coverImg"), FairyTaleController.create);
router.put("/", imageUpload.single("coverImg"), FairyTaleController.update);
router.delete("/:id", FairyTaleController.delete);

export default router;
