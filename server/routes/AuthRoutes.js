import { Router } from "express";
import { uploadSingle } from "../config/cloudinary.config.js";
import {
  getUserInfo,
  login,
  setUserImage,
  setUserInfo,
  signup,
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/get-user-info", verifyToken, getUserInfo);
authRoutes.post("/set-user-info", verifyToken, setUserInfo);

authRoutes.post(
  "/set-user-image",
  verifyToken,
  uploadSingle.single("images"),
  setUserImage
);

export default authRoutes;
