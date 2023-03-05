import Router from "express";
import multer from "multer";
import FairyTaleController from "./FairyTaleController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = new Router();
const imageUpload = multer({ dest: "uploads/images" });

router.get("/", AuthMiddleware.checkToken, FairyTaleController.getAll);
router.get("/:id", AuthMiddleware.checkToken, FairyTaleController.get);
router.post(
  "/",
  AuthMiddleware.checkToken,
  imageUpload.single("coverImg"),
  FairyTaleController.create
);
router.put(
  "/",
  AuthMiddleware.checkToken,
  imageUpload.single("coverImg"),
  FairyTaleController.update
);
router.delete("/:id", AuthMiddleware.checkToken, FairyTaleController.delete);

export default router;
