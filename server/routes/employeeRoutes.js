const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addEmployee,
  getAllEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// All routes are protected
router.use(authMiddleware);

router.post("/", addEmployee);
router.get("/", getAllEmployees);
router.get("/search", searchEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
