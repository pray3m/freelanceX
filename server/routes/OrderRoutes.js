import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createOrder } from "../controllers/OrderController.js";

export const orderRoutes = Router();

orderRoutes.post("/create", verifyToken, createOrder);
