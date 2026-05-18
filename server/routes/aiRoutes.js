const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getAIRecommendation } = require("../controllers/aiController");

// Protected route
router.post("/recommend", authMiddleware, getAIRecommendation);

module.exports = router;
