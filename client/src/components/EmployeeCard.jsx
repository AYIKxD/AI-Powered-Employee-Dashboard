import PerformanceBar from "./PerformanceBar";
import DepartmentBadge from "./DepartmentBadge";

function EmployeeCard({ employee, onDelete }) {
  return (
    <div className="glass emp-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "var(--t-lg)", color: "var(--pale)", letterSpacing: "-.01em", marginBottom: ".2rem" }}>{employee.name}</div>
          <div style={{ fontSize: "var(--t-xs)", color: "var(--text-3)" }}>{employee.email}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
          <DepartmentBadge department={employee.department} />
          {onDelete && (
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(employee._id)} id={`delete-emp-${employee._id}`}>Delete</button>
          )}
        </div>
      </div>

      <div style={{ margin: ".8rem 0 .6rem" }}>
        <div style={{ fontSize: "var(--t-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-3)", marginBottom: ".4rem" }}>Performance</div>
        <PerformanceBar score={employee.performanceScore} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".3rem .8rem", fontSize: "var(--t-xs)", color: "var(--text-2)", paddingTop: ".7rem", borderTop: "1px solid var(--border)", marginTop: ".5rem" }}>
        <div style={{ display: "flex", gap: ".3rem" }}><strong style={{ color: "var(--text-1)" }}>Exp:</strong> {employee.experience} {employee.experience === 1 ? "yr" : "yrs"}</div>
        <div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap" }}>
          <strong style={{ color: "var(--text-1)" }}>Skills:</strong>
          {employee.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
        </div>
      </div>
    </div>
  );
}
export default EmployeeCard;
