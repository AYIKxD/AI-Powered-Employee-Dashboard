// Global error handling middleware
const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: "Validation error",
      errors: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      message: `Duplicate value for ${field}. This ${field} already exists.`,
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorMiddleware;
