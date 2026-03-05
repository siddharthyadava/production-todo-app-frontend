import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const res = await AuthServices.loginUSer({ email, password });
      toast.success(res.data.message);
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      navigate("/home");
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
            <i className="fa-solid fa-bolt" />
            Welcome Back
          </span>
          <h1>Continue where you left off.</h1>
          <p>Log in to manage your tasks, priorities, and progress in one place.</p>
          <ul>
            <li>
              <i className="fa-solid fa-check-circle" />
              Quick task creation
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Smooth edit and status updates
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Mobile friendly layout
            </li>
          </ul>
        </aside>

        <div className="auth-form-card">
          <h2>Sign in</h2>
          <p className="auth-subtitle">Use your account credentials to continue.</p>

          <form className="auth-form" onSubmit={loginHandler}>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              New here? <Link to="/register">Create an account</Link>
            </p>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
