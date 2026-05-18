import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PerformanceBar from "../components/PerformanceBar";

const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const icons = {
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  chart: "M18 20V10M12 20V4M6 20v-6",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20h10c0-.76-.85-1.25-2.03-1.79C14.47 17.98 14 17.55 14 17v-2.34M18 9a6 6 0 0 1-12 0V3h12v6z",
  building: "M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16",
  medal: "M12 15l-3.5 6 1-3.5L6 17l3.5-1L12 15zM12 15l3.5 6-1-3.5L18 17l-3.5-1L12 15zM12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
};

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEmployees(); }, []);
  const fetchEmployees = async () => {
    try { const res = await api.get("/employees"); setEmployees(res.data); }
    catch (err) { console.error("Failed to fetch:", err); }
    finally { setLoading(false); }
  };

  const totalEmployees = employees.length;
  const avgScore = totalEmployees > 0 ? (employees.reduce((s, e) => s + e.performanceScore, 0) / totalEmployees).toFixed(1) : 0;
  const highPerformers = employees.filter((e) => e.performanceScore >= 80).length;
  const departments = [...new Set(employees.map((e) => e.department))];
  const topPerformers = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);
  const deptBreakdown = departments.map((dept) => {
    const de = employees.filter((e) => e.department === dept);
    return { department: dept, count: de.length, avgScore: (de.reduce((s, e) => s + e.performanceScore, 0) / de.length).toFixed(1) };
  });

  if (loading) return (<div className="page-wrapper"><div className="container"><div className="spinner-wrapper"><div className="spinner spinner-lg"></div></div></div></div>);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fade-in-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div><h1>Dashboard</h1><p>Employee performance overview & analytics</p></div>
          <Link to="/employees/new" className="btn btn-primary" id="add-employee-btn">+ Add Employee</Link>
        </div>

        <div className="grid-4 stagger" style={{ marginBottom: "2rem" }}>
          <div className="stat-card animate-fade-in-up">
            <div className="stat-icon" style={{ background: "rgba(226,133,46,0.12)" }}><Icon d={icons.users} color="var(--orange)" /></div>
            <div className="stat-value">{totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
          <div className="stat-card animate-fade-in-up">
            <div className="stat-icon" style={{ background: "rgba(245,200,87,0.12)" }}><Icon d={icons.chart} color="var(--gold)" /></div>
            <div className="stat-value">{avgScore}</div>
            <div className="stat-label">Avg Performance</div>
          </div>
          <div className="stat-card animate-fade-in-up">
            <div className="stat-icon" style={{ background: "rgba(74,222,128,0.12)" }}><Icon d={icons.trophy} color="#4ade80" /></div>
            <div className="stat-value">{highPerformers}</div>
            <div className="stat-label">High Performers</div>
          </div>
          <div className="stat-card animate-fade-in-up">
            <div className="stat-icon" style={{ background: "rgba(171,224,240,0.12)" }}><Icon d={icons.building} color="var(--sky)" /></div>
            <div className="stat-value">{departments.length}</div>
            <div className="stat-label">Departments</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="glass animate-fade-in-up" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-xl)", color: "var(--pale)", marginBottom: "1.25rem", letterSpacing: "-.01em", display: "flex", alignItems: "center", gap: ".5rem" }}><Icon d={icons.medal} color="var(--gold)" /> Top Performers</h2>
            {topPerformers.length === 0 ? (<div className="empty-state"><p>No employees yet</p></div>) : (
              <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
                {topPerformers.map((emp, i) => (
                  <div key={emp._id} style={{ display: "flex", alignItems: "center", gap: ".75rem", padding: ".75rem", background: "rgba(255,238,145,0.02)", borderRadius: "var(--r-sm)", border: "1px solid var(--border)" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,var(--orange),var(--gold))" : "var(--bg-3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", fontWeight: 700, color: i === 0 ? "var(--bg)" : "var(--text-2)", flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: "var(--t-sm)", marginBottom: ".25rem" }}>{emp.name}</div>
                      <PerformanceBar score={emp.performanceScore} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass animate-fade-in-up" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-xl)", color: "var(--pale)", marginBottom: "1.25rem", letterSpacing: "-.01em", display: "flex", alignItems: "center", gap: ".5rem" }}><Icon d={icons.building} color="var(--sky)" /> Department Breakdown</h2>
            {deptBreakdown.length === 0 ? (<div className="empty-state"><p>No departments yet</p></div>) : (
              <div className="table-container">
                <table className="data-table">
                  <thead><tr><th>Department</th><th>Employees</th><th>Avg Score</th></tr></thead>
                  <tbody>
                    {deptBreakdown.map((d) => (
                      <tr key={d.department}>
                        <td style={{ fontWeight: 600, color: "var(--text-1)" }}>{d.department}</td>
                        <td>{d.count}</td>
                        <td><span style={{ color: d.avgScore >= 80 ? "#4ade80" : d.avgScore >= 50 ? "var(--orange)" : "#f08080", fontWeight: 600 }}>{d.avgScore}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
