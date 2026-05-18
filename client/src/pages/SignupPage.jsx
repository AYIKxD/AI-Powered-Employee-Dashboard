import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) { setError("All fields are required."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", { name: form.name.trim(), email: form.email.trim(), password: form.password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-glow" />
        <div className="auth-left-brand">Track.<br /><em>Analyze.</em></div>
        <div style={{ zIndex: 1 }}>
          <p className="auth-left-tagline">Join your HR team in making data-driven decisions with AI-powered insights.</p>
          <br />
          <div className="auth-left-badge"><span>✨</span> Free to use · Enterprise-grade</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-heading">Create account</h1>
          <p className="auth-subheading">Join the employee performance analytics platform.</p>

          <div className="glass auth-card">
            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Full Name</label>
                <input id="reg-name" className="form-input" type="text" name="name" placeholder="Aman Verma" value={form.name} onChange={handleChange} required autoComplete="name" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email</label>
                <input id="reg-email" className="form-input" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required autoComplete="email" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">Password</label>
                <input id="reg-password" className="form-input" type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required minLength={6} autoComplete="new-password" />
              </div>
              <button id="register-btn" type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: "0.2rem" }}>
                {loading ? <span className="spinner" /> : "Create Account"}
              </button>
            </form>
            <div className="auth-divider">or</div>
            <div className="auth-footer-text">Already have an account? <Link to="/login">Sign in</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
