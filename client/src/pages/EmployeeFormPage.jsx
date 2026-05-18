import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EmployeeFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", department: "", skills: "", performanceScore: "", experience: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const departments = ["Development", "Design", "Marketing", "HR", "Finance", "Sales", "Operations"];

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(""); setSuccess(""); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(""); setSuccess("");
    if (!formData.name || !formData.email || !formData.department || !formData.skills || !formData.performanceScore || !formData.experience) { setError("Please fill in all fields"); setLoading(false); return; }
    const score = Number(formData.performanceScore);
    if (score < 0 || score > 100) { setError("Score must be 0-100"); setLoading(false); return; }
    try {
      await api.post("/employees", { name: formData.name, email: formData.email, department: formData.department, skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean), performanceScore: score, experience: Number(formData.experience) });
      setSuccess("Employee added!"); setTimeout(() => navigate("/employees"), 1200);
    } catch (err) { setError(err.response?.data?.message || "Failed to add employee"); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="page-header animate-fade-in-up"><h1>Add Employee</h1><p>Register a new team member</p></div>
        <div className="glass animate-fade-in-up" style={{ padding: "1.5rem" }}>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-xl)", color: "var(--pale)", marginBottom: "1.3rem", letterSpacing: "-.01em" }}>Employee Details</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
            <div className="form-group" style={{marginBottom:0}}><label className="form-label" htmlFor="emp-name">Employee Name</label><input type="text" id="emp-name" name="name" value={formData.name} onChange={handleChange} placeholder="Aman Verma" className="form-input" required /></div>
            <div className="form-group" style={{marginBottom:0}}><label className="form-label" htmlFor="emp-email">Email Address</label><input type="email" id="emp-email" name="email" value={formData.email} onChange={handleChange} placeholder="aman@gmail.com" className="form-input" required /></div>
            <div className="form-group" style={{marginBottom:0}}><label className="form-label" htmlFor="emp-department">Department</label><select id="emp-department" name="department" value={formData.department} onChange={handleChange} className="form-select" required><option value="">Select Department</option>{departments.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
            <div className="form-group" style={{marginBottom:0}}><label className="form-label" htmlFor="emp-skills">Skills (comma-separated)</label><input type="text" id="emp-skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="form-input" required /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem" }}>
              <div className="form-group" style={{marginBottom:0}}><label className="form-label" htmlFor="emp-score">Performance Score (0-100)</label><input type="number" id="emp-score" name="performanceScore" value={formData.performanceScore} onChange={handleChange} placeholder="85" className="form-input" min="0" max="100" required /></div>
              <div className="form-group" style={{marginBottom:0}}><label className="form-label" htmlFor="emp-exp">Years of Experience</label><input type="number" id="emp-exp" name="experience" value={formData.experience} onChange={handleChange} placeholder="3" className="form-input" min="0" required /></div>
            </div>
            <div style={{ display: "flex", gap: ".7rem", marginTop: ".3rem" }}>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading} id="submit-employee-btn">{loading ? <span className="spinner" /> : "Add Employee"}</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate("/employees")} id="cancel-employee-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EmployeeFormPage;
