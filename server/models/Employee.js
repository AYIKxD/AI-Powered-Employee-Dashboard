const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: [
          "Development",
          "Design",
          "Marketing",
          "HR",
          "Finance",
          "Sales",
          "Operations",
        ],
        message: "{VALUE} is not a valid department",
      },
    },

    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Skills array cannot be empty",
      },
    },

    performanceScore: {
      type: Number,
      required: [true, "Performance score is required"],
      min: [0, "Performance score cannot be less than 0"],
      max: [100, "Performance score cannot exceed 100"],
    },

    experience: {
      type: Number,
      required: [true, "Years of experience is required"],
      min: [0, "Experience cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
