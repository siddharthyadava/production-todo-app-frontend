import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter email");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthServices.forgotPassword({ email });

      if (res.data && res.data.success) {
        toast.success(res.data.message || "Reset link sent if email exists");
      } else {
        toast.error(
          (res.data && res.data.message) ||
            "Something went wrong, please try again"
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
            type="email"
            className="form-control"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-bottom">
          <p className="text-center">
            ⬅️ <Link to="/login">Back to Login</Link>
          </p>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
