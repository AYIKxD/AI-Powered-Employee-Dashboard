const departmentColors = {
  Development: "blue",
  Design: "violet",
  Marketing: "amber",
  HR: "emerald",
  Finance: "blue",
  Sales: "amber",
  Operations: "rose",
};

function DepartmentBadge({ department }) {
  const color = departmentColors[department] || "blue";

  return <span className={`badge badge-${color}`}>{department}</span>;
}

export default DepartmentBadge;
