import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthServices.forgotPassword({ email });
      if (res.data?.success) {
        toast.success(res.data.message || "Reset link sent if email exists");
      } else {
        toast.error(res.data?.message || "Something went wrong, please try again");
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
            <i className="fa-solid fa-shield-heart" />
            Secure Recovery
          </span>
          <h1>Reset your password safely.</h1>
          <p>
            Enter your registered email and we will send a reset link if your account
            exists.
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-check-circle" />
              One-time reset token
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Link expiration protection
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Private account lookup
            </li>
          </ul>
        </aside>

        <div className="auth-form-card">
          <h2>Forgot password</h2>
          <p className="auth-subtitle">We will send a reset link to your email.</p>

          <form className="auth-form" onSubmit={submitHandler}>
            <div className="auth-field">
              <label htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
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

export default ForgotPassword;
