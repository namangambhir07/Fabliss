import { useAuth } from "../context/AuthContext.jsx";
import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NAME_RE = /^[A-Za-z\s]{2,40}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// Login/signup modal used both as a standalone route (Login.jsx / Signup.jsx
// render it inline) and as a popup triggered by "Add to Cart" when the
// shopper isn't logged in yet.
const AuthModal = ({ inline = false }) => {
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab, login, signup, onAuthSuccess } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (!inline && !authModalOpen) return null;

  const isSignup = authModalTab === "signup";

  const validate = () => {
    const e = {};
    if (isSignup && !NAME_RE.test(form.name.trim())) e.name = "Enter a valid name (letters only)";
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address";
    if (isSignup && !PHONE_RE.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number";
    if (!PASSWORD_RE.test(form.password)) e.password = "Min 8 characters, with a letter and a number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);

    try {
      if (isSignup) {
        await signup(form);
        setForm({ name: "", email: "", phone: "", password: "" });
        setAuthModalTab("login");
      } else {
        await login(form.email, form.password);
      }

      const redirectTo = onAuthSuccess();
      navigate(redirectTo || "/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const body = (
    <>
      <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>Fabliss Account</span>
      <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
      <p className="sub-line">{isSignup ? "Sign up to save your cart and track your orders." : "Log in to continue to checkout."}</p>

      {serverError && <div className="form-error-banner">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        {isSignup && (
          <div className="field">
            <label>Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ananya Sharma" />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>
        )}
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        {isSignup && (
          <div className="field">
            <label>Phone Number</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98765 43210" />
            {errors.phone && <div className="field-error">{errors.phone}</div>}
          </div>
        )}
        <div className="field">
  <label>Password</label>

  <div className="password-input">
    <input
      type={showPassword ? "text" : "password"}
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      placeholder="••••••••"
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>

  {errors.password && <div className="field-error">{errors.password}</div>}
</div>

        <button className="btn btn-primary btn-full" disabled={loading}>
          {loading ? "Please wait…" : isSignup ? "Create Account" : "Log In"}
        </button>
      </form>

      <div className="auth-switch">
        {isSignup ? "Already have an account? " : "New to Fabliss? "}
        <a onClick={() => { setAuthModalTab(isSignup ? "login" : "signup"); setErrors({}); setServerError(""); }} style={{ cursor: "pointer" }}>
          {isSignup ? "Log in" : "Sign up"}
        </a>
      </div>
    </>
  );

  if (inline) return <div className="auth-card">{body}</div>;

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setAuthModalOpen(false)}><FaTimes /></button>
        {body}
      </div>
    </div>
  );
};

export default AuthModal;
