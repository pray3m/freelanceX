import {
  addGig,
  getAllUserGigs,
  getGigById,
} from "../controllers/GigController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { Router } from "express";
import multer from "multer";

export const gigRoutes = Router();

const upload = multer({ dest: "uploads/" });

gigRoutes.post("/add", verifyToken, upload.array("images"), addGig);
gigRoutes.get("/", verifyToken, getAllUserGigs);
gigRoutes.get("/:gigId", getGigById);
