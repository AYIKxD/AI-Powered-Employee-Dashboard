import { useEffect, useState } from "react";
import api from "../services/api";

const Icon = ({ d, size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ic = {
  cpu: "M6 6h12v12H6zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V5a2.5 2.5 0 0 1 2.5-2.5H20v17H6.5A2.5 2.5 0 0 0 4 19.5z",
  alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  msg: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20h10c0-.76-.85-1.25-2.03-1.79C14.47 17.98 14 17.55 14 17v-2.34M18 9a6 6 0 0 1-12 0V3h12v6z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

function AIRecommendationPage() {
  const [employees, setEmployees] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [empLoading, setEmpLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => { fetchEmployees(); }, []);
  const fetchEmployees = async () => {
    try { const res = await api.get("/employees"); setEmployees(res.data); }
    catch { setError("Failed to fetch employees"); }
    finally { setEmpLoading(false); }
  };

  const generateRecommendations = async () => {
    setLoading(true); setError(""); setRecommendations(null);
    try {
      const body = selectedEmployee ? { employeeId: selectedEmployee } : {};
      const res = await api.post("/ai/recommend", body);
      setRecommendations(res.data.aiRecommendation);
    } catch (err) { setError(err.response?.data?.message || "Failed to generate AI recommendations"); }
    finally { setLoading(false); }
  };

  const getCategoryClass = (c) => { if (!c) return ""; const l = c.toLowerCase(); if (l.includes("high")) return "high-performer"; if (l.includes("average")) return "average-performer"; return "needs-improvement"; };
  const getCategoryBadge = (c) => { if (!c) return "badge-amber"; const l = c.toLowerCase(); if (l.includes("high")) return "badge-emerald"; if (l.includes("average")) return "badge-amber"; return "badge-rose"; };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fade-in-up"><h1>AI Insights</h1><p>AI-powered recommendations for promotions, training, and improvement</p></div>

        <div className="glass animate-fade-in-up" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-xl)", color: "var(--pale)", marginBottom: "1rem", letterSpacing: "-.01em", display: "flex", alignItems: "center", gap: ".5rem" }}><Icon d={ic.cpu} color="var(--orange)" size={22} /> Generate Recommendations</h2>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0, minWidth: "200px" }}>
              <label className="form-label" htmlFor="ai-employee-select">Select Employee (or leave empty for all)</label>
              <select id="ai-employee-select" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className="form-select">
                <option value="">All Employees</option>
                {employees.map((emp) => <option key={emp._id} value={emp._id}>{emp.name} — {emp.department} ({emp.performanceScore}%)</option>)}
              </select>
            </div>
            <button className="btn btn-primary btn-lg" onClick={generateRecommendations} disabled={loading || empLoading || employees.length === 0} id="generate-ai-btn">
              {loading ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></span> Analyzing...</> : "Generate AI Insights"}
            </button>
          </div>
          {employees.length === 0 && !empLoading && <p style={{ marginTop: "1rem", fontSize: "var(--t-xs)", color: "var(--text-3)" }}>Add employees first to generate recommendations.</p>}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {recommendations && (
          <div className="animate-fade-in-up">
            {recommendations.overallAnalysis && (
              <div className="glass" style={{ padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "3px solid var(--orange)" }}>
                <h3 style={{ fontSize: "var(--t-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-3)", marginBottom: ".5rem" }}>Overall Analysis</h3>
                <p style={{ color: "var(--text-2)", lineHeight: 1.7, fontSize: "var(--t-sm)" }}>{recommendations.overallAnalysis}</p>
                {recommendations.topPerformer && <p style={{ marginTop: ".75rem", color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", gap: ".4rem" }}><Icon d={ic.trophy} color="#4ade80" size={16} /> Top Performer: {recommendations.topPerformer}</p>}
              </div>
            )}

            {recommendations.recommendations && (
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-xl)", color: "var(--pale)", marginBottom: "1rem" }}>Individual Recommendations</h2>
                <div className="grid-2 stagger">
                  {recommendations.recommendations.map((rec, i) => (
                    <div key={i} className={`ai-card ${getCategoryClass(rec.category)}`}>
                      <div className="ai-card-header">
                        <div>
                          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-lg)", color: "var(--pale)" }}>{rec.employeeName}</h3>
                          <span className={`badge ${getCategoryBadge(rec.category)}`} style={{ marginTop: ".375rem" }}>{rec.category}</span>
                        </div>
                        <div className="ai-card-rank">#{rec.rank}</div>
                      </div>
                      <div className="ai-card-section"><h4 style={{ display: "flex", alignItems: "center", gap: ".3rem" }}><Icon d={ic.trending} color="var(--text-3)" size={14} /> Promotion</h4><p style={{ fontSize: "var(--t-sm)", color: "var(--text-2)" }}>{rec.promotionRecommendation}</p></div>
                      {rec.trainingSuggestions?.length > 0 && (<div className="ai-card-section"><h4 style={{ display: "flex", alignItems: "center", gap: ".3rem" }}><Icon d={ic.book} color="var(--text-3)" size={14} /> Training</h4><div style={{ display: "flex", flexWrap: "wrap", gap: ".25rem" }}>{rec.trainingSuggestions.map((s, j) => <span key={j} className="skill-tag">{s}</span>)}</div></div>)}
                      {rec.missingSkills?.length > 0 && (<div className="ai-card-section"><h4 style={{ display: "flex", alignItems: "center", gap: ".3rem" }}><Icon d={ic.alert} color="var(--text-3)" size={14} /> Skill Gaps</h4><div style={{ display: "flex", flexWrap: "wrap", gap: ".25rem" }}>{rec.missingSkills.map((s, j) => <span key={j} className="skill-tag missing">{s}</span>)}</div></div>)}
                      {rec.feedback && (<div className="ai-card-section"><h4 style={{ display: "flex", alignItems: "center", gap: ".3rem" }}><Icon d={ic.msg} color="var(--text-3)" size={14} /> AI Feedback</h4><p style={{ fontSize: "var(--t-sm)", color: "var(--text-2)", lineHeight: 1.6 }}>{rec.feedback}</p></div>)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendations.rawResponse && (<div className="glass" style={{ padding: "1.5rem" }}><h3 style={{ marginBottom: "1rem" }}>AI Response</h3><pre style={{ whiteSpace: "pre-wrap", fontSize: "var(--t-sm)", color: "var(--text-2)", lineHeight: 1.6 }}>{recommendations.rawResponse}</pre></div>)}
          </div>
        )}

        {!recommendations && !loading && !error && (
          <div className="empty-state animate-fade-in-up">
            <div style={{ opacity: .35 }}><Icon d={ic.cpu} size={48} color="var(--text-2)" /></div>
            <h3>Ready for AI Analysis</h3>
            <p>Select an employee or choose "All Employees" and click generate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default AIRecommendationPage;
