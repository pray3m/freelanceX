import { Router } from "express";
import { signup, login } from "../controllers/AuthControllers.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

export default authRoutes;
