import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) { setError("Email and password are required."); return; }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email: form.email.trim(), password: form.password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-glow" />
        <div className="auth-left-brand">Performance<br /><em>IQ</em></div>
        <div style={{ zIndex: 1 }}>
          <p className="auth-left-tagline">AI-powered employee analytics for smarter HR decisions.</p>
          <br />
          <div className="auth-left-badge"><span>📊</span> Analytics · AI Insights</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-heading">Sign in</h1>
          <p className="auth-subheading">Access employee analytics and AI insights.</p>

          <div className="glass auth-card">
            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input id="login-email" className="form-input" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required autoComplete="email" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <input id="login-password" className="form-input" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required autoComplete="current-password" />
              </div>
              <button id="login-btn" type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: "0.2rem" }}>
                {loading ? <span className="spinner" /> : "Sign In"}
              </button>
            </form>
            <div className="auth-divider">or</div>
            <div className="auth-footer-text">New here? <Link to="/signup">Create an account</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
