import Router from "express";
import multer from "multer";
import ProfileController from "./ProfileController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = new Router();
const imageUpload = multer({ dest: "uploads/images" });

router.get("/", AuthMiddleware.checkToken, ProfileController.getAll);
router.get("/:id", AuthMiddleware.checkToken, ProfileController.get);
router.post(
  "/registration",
  imageUpload.single("avatarImg"),
  ProfileController.registration
);
router.post("/login", imageUpload.none(), ProfileController.login);

router.put(
  "/",
  AuthMiddleware.checkToken,
  imageUpload.single("avatarImg"),
  ProfileController.update
);
router.delete("/:id", AuthMiddleware.checkToken, ProfileController.delete);

export default router;
