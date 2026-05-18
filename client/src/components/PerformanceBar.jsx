function PerformanceBar({ score }) {
  const getLevel = () => {
    if (score >= 80) return "high";
    if (score >= 50) return "medium";
    return "low";
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div className="perf-bar-container" style={{ flex: 1 }}>
        <div className={`perf-bar-fill ${getLevel()}`} style={{ width: `${score}%` }} />
      </div>
      <span style={{ fontSize: "var(--t-xs)", fontWeight: 600, color: score >= 80 ? "#4ade80" : score >= 50 ? "var(--orange)" : "#f08080", minWidth: "2.5rem", textAlign: "right" }}>{score}%</span>
    </div>
  );
}
export default PerformanceBar;
