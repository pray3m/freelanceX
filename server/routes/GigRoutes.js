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
import multer from "multer";

export const gigRoutes = Router();

const upload = multer({ dest: "uploads/" });

gigRoutes.post("/add", verifyToken, upload.array("images"), addGig);
gigRoutes.get("/", verifyToken, getAllUserGigs);
gigRoutes.get("/get/:gigId", getGigById);
gigRoutes.put("/edit/:gigId", verifyToken, upload.array("images"), updateGig);
gigRoutes.get("/search", searchGigs);
gigRoutes.get("/check-gig-order/:gigId", verifyToken, checkGigOrder);
gigRoutes.post("/review/:gigId", verifyToken, addReview);
