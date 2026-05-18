import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const UsersIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:.35}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></svg>);
import EmployeeCard from "../components/EmployeeCard";
import SearchFilter from "../components/SearchFilter";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ name: "", department: "" });

  useEffect(() => { fetchEmployees(); }, []);
  const fetchEmployees = async () => {
    try { setLoading(true); const res = await api.get("/employees"); setEmployees(res.data); }
    catch { setError("Failed to fetch employees"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try { await api.delete(`/employees/${id}`); setEmployees((prev) => prev.filter((e) => e._id !== id)); }
    catch { setError("Failed to delete employee"); }
  };

  const filtered = employees.filter((emp) => {
    const matchesName = !filters.name || emp.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesDept = !filters.department || emp.department === filters.department;
    return matchesName && matchesDept;
  });

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fade-in-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div><h1>Employees</h1><p>Manage and track your team</p></div>
          <Link to="/employees/new" className="btn btn-primary" id="add-new-employee-btn">+ Add Employee</Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        <div className="animate-fade-in-up"><SearchFilter filters={filters} setFilters={setFilters} /></div>
        <p style={{ fontSize: "var(--t-xs)", color: "var(--text-3)", marginBottom: "1rem" }}>Showing {filtered.length} of {employees.length} employees</p>

        {loading ? (<div className="spinner-wrapper"><div className="spinner spinner-lg"></div></div>) :
         filtered.length === 0 ? (
          <div className="empty-state animate-fade-in-up">
            <UsersIcon />
            <h3>{employees.length === 0 ? "No employees yet" : "No results"}</h3>
            <p>{employees.length === 0 ? "Start by adding your first employee." : "Try adjusting your search filters."}</p>
            {employees.length === 0 && <Link to="/employees/new" className="btn btn-primary" style={{ marginTop: "1rem" }}>+ Add Employee</Link>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
            {filtered.map((emp) => <EmployeeCard key={emp._id} employee={emp} onDelete={handleDelete} />)}
          </div>
        )}
      </div>
    </div>
  );
}
export default EmployeeListPage;
