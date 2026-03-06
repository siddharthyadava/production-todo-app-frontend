import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthServices.resetPassword(token, { password });
      if (res.data?.success) {
        toast.success(res.data.message || "Password reset successfully");
        navigate("/login");
      } else {
        toast.error(res.data?.message || "Failed to reset password. Try again.");
      }
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
            <i className="fa-solid fa-key" />
            Update Credentials
          </span>
          <h1>Set a fresh password for your account.</h1>
          <p>Create a new secure password and continue using your dashboard.</p>
          <ul>
            <li>
              <i className="fa-solid fa-check-circle" />
              Password validation before submit
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              OTP-verified reset flow
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Redirect to sign-in after success
            </li>
          </ul>
        </aside>

        <div className="auth-form-card">
          <h2>Reset password</h2>
          <p className="auth-subtitle">Your new password must be at least 6 characters.</p>

          <form className="auth-form" onSubmit={submitHandler}>
            <div className="auth-field">
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
