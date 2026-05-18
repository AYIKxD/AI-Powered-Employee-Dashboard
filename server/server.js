const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

// Route imports
const employeeRoutes = require("./routes/employeeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Employee Performance Analytics API Running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      employees: "/api/employees",
      ai: "/api/ai",
    },
  });
});

// Global error handler (must be after routes)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();