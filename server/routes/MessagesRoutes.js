import { Router } from "express";
import { addMessage, getMessages } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

export const messageRoutes = Router();

messageRoutes.post("/send-message/:orderId", verifyToken, addMessage);
messageRoutes.get("/get-messages/:orderId", verifyToken, getMessages);
