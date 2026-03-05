import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const res = await AuthServices.registerUser({ email, password, username });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <span className="auth-orb auth-orb--one" />
      <span className="auth-orb auth-orb--two" />

      <section className="auth-panel enter-up">
        <aside className="auth-copy">
          <span className="pill">
            <i className="fa-solid fa-rocket" />
            Join TaskPulse
          </span>
          <h1>Create your account and plan better every day.</h1>
          <p>Set up your profile once and start organizing all your priorities instantly.</p>
          <ul>
            <li>
              <i className="fa-solid fa-check-circle" />
              Structured task dashboard
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Fast search and task controls
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Clean UI built for small screens
            </li>
          </ul>
        </aside>

        <div className="auth-form-card">
          <h2>Create account</h2>
          <p className="auth-subtitle">Start organizing in less than a minute.</p>

          <form className="auth-form" onSubmit={registerHandler}>
            <div className="auth-field">
              <label htmlFor="register-username">Username</label>
              <input
                id="register-username"
                type="text"
                placeholder="Your display name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already registered? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
