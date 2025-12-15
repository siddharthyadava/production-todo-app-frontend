import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const ResetPassword = () => {
  const { token } = useParams(); // from /reset-password/:token
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirm) {
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

      if (res.data && res.data.success) {
        toast.success(res.data.message || "Password reset successfully");
        navigate("/login");
      } else {
        toast.error(
          (res.data && res.data.message) ||
            "Failed to reset password. Try again."
        );
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHandler}>
        <div className="mb-3">
          <i className="fa-solid fa-circle-user"></i>
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <div className="form-bottom">
          <p className="text-center">
            ⬅️ <Link to="/login">Back to Login</Link>
          </p>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
