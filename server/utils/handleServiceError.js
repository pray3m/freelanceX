import AppError from "./AppError.js";

export const handleServiceError = (
  error,
  operation = "performing operation"
) => {
  // If it's already an AppError, rethrow it
  if (error instanceof AppError) {
    throw error;
  }

  // Log the error with context
  console.error(`Error ${operation}:`, error);

  // Handle Prisma specific errors
  if (error.code) {
    const prismaError = handlePrismaError(error);
    throw prismaError;
  }

  // Handle all other unexpected errors
  throw new AppError(500, `An unexpected error occurred while ${operation}`);
};

const handlePrismaError = (error) => {
  switch (error.code) {
    case "P2025": // Record not found
      return new AppError(404, "Record not found");
    case "P2002": // Unique constraint violation
      return new AppError(400, "A record with this value already exists");
    case "P2014": // Invalid ID
    case "P2003": // Foreign key constraint failed
      return new AppError(400, "Invalid input data");
    default:
      return new AppError(500, "Database operation failed");
  }
};
