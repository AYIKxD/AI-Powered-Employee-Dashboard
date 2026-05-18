import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <span className="logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
        PerformanceIQ
      </div>

      {isAuthenticated && (
        <div className="navbar-links">
          <NavLink to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Dashboard</NavLink>
          <NavLink to="/employees" className={`nav-link ${location.pathname.startsWith("/employees") ? "active" : ""}`}>Employees</NavLink>
          <NavLink to="/ai" className={`nav-link ${location.pathname === "/ai" ? "active" : ""}`}>AI Insights</NavLink>
        </div>
      )}

      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <div className="navbar-user">
              <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <span>{user?.name}</span>
            </div>
            <button className="btn btn-ghost btn-sm" id="logout-btn"
              onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate("/login")}>Login</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
