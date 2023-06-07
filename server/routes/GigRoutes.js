import {
  addGig,
  getAllUserGigs,
  getGigById,
  updateGig,
} from "../controllers/GigController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { Router } from "express";
import multer from "multer";

export const gigRoutes = Router();

const upload = multer({ dest: "uploads/" });

gigRoutes.post("/add", verifyToken, upload.array("images"), addGig);
gigRoutes.get("/", verifyToken, getAllUserGigs);
gigRoutes.get("/:gigId", getGigById);
gigRoutes.put("/:gigId", verifyToken, upload.array("images"), updateGig);
