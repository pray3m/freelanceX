import AppError from "./AppError.js";

const errorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err.stack);

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  const response = {
    status: "error",
    message,
  };

  // Include additional details if available
  if (err instanceof AppError && err.details) {
    response.details = err.details; // Include detailed error info if it's an AppError
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
