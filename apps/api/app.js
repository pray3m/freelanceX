import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./prisma/client.js";

const app = express();

// Security
app.use(helmet());

// Logging Middleware
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Routes
import router from "./routes/index.js";

app.get("/", (req, res) => {
  res.send(" 🚀 FreelanceX API Playground!🤖 ");
});

app.use("/", router);

// 404 Handler
import { AppError, errorHandler } from "./utils/index.js";
app.use((req, res, next) => {
  throw new AppError(404, "Resource not found");
});

app.use(errorHandler);

// Handle Uncaught Exceptions and Rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

export default app;
