const Employee = require("../models/Employee");

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Protected
const addEmployee = async (req, res, next) => {
  try {
    const { name, email, department, skills, performanceScore, experience } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !department ||
      !skills ||
      performanceScore === undefined ||
      experience === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee with this email already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json({
      message: "Employee stored successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Protected
const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Search employees by department
// @route   GET /api/employees/search?department=Development
// @access  Protected
const searchEmployees = async (req, res, next) => {
  try {
    const { department, name, minScore, maxScore } = req.query;

    const filter = {};

    if (department) {
      filter.department = department;
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (minScore || maxScore) {
      filter.performanceScore = {};
      if (minScore) filter.performanceScore.$gte = Number(minScore);
      if (maxScore) filter.performanceScore.$lte = Number(maxScore);
    }

    const employees = await Employee.find(filter).sort({
      performanceScore: -1,
    });

    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Protected
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Protected
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
};
