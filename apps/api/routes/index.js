import { Router } from "express";
import authRoutes from "./AuthRoutes.js";
import { dashboardRoutes } from "./DashboardRoutes.js";
import { gigRoutes } from "./GigRoutes.js";
import { messageRoutes } from "./MessagesRoutes.js";
import { orderRoutes } from "./OrderRoutes.js";
import express from "express";

const router = Router();

router.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

router.use("/uploads/profiles", express.static("uploads/profiles"));
router.use("/uploads", express.static("uploads"));

router.use("/api/auth", authRoutes);
router.use("/api/gigs", gigRoutes);
router.use("/api/orders", orderRoutes);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/messages", messageRoutes);

export default router;
