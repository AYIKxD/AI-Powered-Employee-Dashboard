const Employee = require("../models/Employee");
const getAIResponse = require("../services/openRouterService");

// @desc    Get AI recommendations for employees
// @route   POST /api/ai/recommend
// @access  Protected
const getAIRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    let employees;

    if (employeeId) {
      // Single employee recommendation
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      employees = [employee];
    } else {
      // All employees
      employees = await Employee.find().sort({ performanceScore: -1 });
    }

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    const employeeSummary = employees
      .map(
        (emp, index) => `
${index + 1}. ${emp.name}
   Email: ${emp.email}
   Department: ${emp.department}
   Skills: ${emp.skills.join(", ")}
   Performance Score: ${emp.performanceScore}/100
   Experience: ${emp.experience} years
`
      )
      .join("\n");

    const prompt = `
You are an AI-powered HR Analytics Assistant for an Employee Performance Analytics system.

Analyze the following employee data and provide comprehensive recommendations.

Return ONLY valid JSON in the following format:
{
  "recommendations": [
    {
      "employeeName": "Name",
      "performanceScore": 85,
      "rank": 1,
      "category": "High Performer" | "Average Performer" | "Needs Improvement",
      "promotionRecommendation": "Recommended for promotion to Senior Developer" or "Not recommended at this time",
      "trainingSuggestions": ["Advanced React", "Leadership Skills"],
      "missingSkills": ["Docker", "AWS"],
      "feedback": "Detailed feedback about the employee's performance and growth potential"
    }
  ],
  "overallAnalysis": "Brief summary of the team's performance",
  "topPerformer": "Name of the top performer"
}

Employee Data:
${employeeSummary}

Provide:
1. Promotion recommendations based on performance scores (80+ = recommend promotion)
2. Employee rankings by overall performance
3. Training suggestions based on department needs and missing skills
4. Constructive AI feedback for each employee
5. Identify skill gaps and recommend improvements
`;

    const aiResponse = await getAIResponse(prompt);

    // Try to parse JSON from AI response
    let parsedResponse;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : aiResponse.trim();
      parsedResponse = JSON.parse(jsonStr);
    } catch {
      // If parsing fails, return raw text
      parsedResponse = { rawResponse: aiResponse };
    }

    res.status(200).json({
      aiRecommendation: parsedResponse,
      employeeCount: employees.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAIRecommendation,
};
