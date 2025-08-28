import { upload } from "../config/cloudinary.config.js";
import {
  addGig,
  getAllUserGigs,
  getGigById,
  searchGigs,
  updateGig,
  addReview,
  checkGigOrder,
} from "../controllers/GigController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { Router } from "express";

export const gigRoutes = Router();

gigRoutes.post("/add", verifyToken, upload.array("images", 5), addGig);
gigRoutes.get("/", verifyToken, getAllUserGigs);
gigRoutes.get("/get/:gigId", getGigById);
gigRoutes.put(
  "/edit/:gigId",
  verifyToken,
  upload.array("images", 5),
  updateGig
);
gigRoutes.get("/search", searchGigs);
gigRoutes.get("/check-gig-order/:gigId", verifyToken, checkGigOrder);
gigRoutes.post("/review/:gigId", verifyToken, addReview);
