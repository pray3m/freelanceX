import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import prisma from "./prisma/client.js";
import { gigRoutes } from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";
import { messageRoutes } from "./routes/MessagesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.PUBLIC_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Prisma connection to MongoDB
prisma
  .$connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

app.get("/", (req, res) => {
  res.send(" 🚀 Skill Bridge API Playground!🤖 ");
});

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server is listening at url: http://localhost:${port}`);
});
