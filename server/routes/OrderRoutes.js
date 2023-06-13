import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { confirmOrder, createOrder } from "../controllers/OrderController.js";

export const orderRoutes = Router();

orderRoutes.post("/create", verifyToken, createOrder);
orderRoutes.put("/success", verifyToken, confirmOrder);
