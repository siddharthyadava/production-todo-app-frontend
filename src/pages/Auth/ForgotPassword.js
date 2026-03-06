import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    setSendingOtp(true);
    try {
      const res = await AuthServices.forgotPassword({ email });
      if (res.data?.success) {
        setOtpSent(true);
        setOtp("");
        toast.success(res.data.message || "OTP sent if email exists");
      } else {
        toast.error(res.data?.message || "Something went wrong, please try again");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSendingOtp(false);
    }
  };

  const sendOtpHandler = async (event) => {
    event.preventDefault();
    await sendOtp();
  };

  const verifyOtpHandler = async (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp.trim())) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);
    try {
      const res = await AuthServices.verifyResetOtp({ email, otp: otp.trim() });
      if (res.data?.success) {
        const resetToken = res.data?.resetToken;
        if (!resetToken) {
          toast.error("OTP verified but reset session was not created");
          return;
        }

        toast.success(res.data.message || "OTP verified successfully");
        navigate(`/reset-password/${resetToken}`);
      } else {
        toast.error(res.data?.message || "Something went wrong, please try again");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setVerifyingOtp(false);
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
            Enter your registered email, verify OTP, then continue to the password
            update page.
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-check-circle" />
              One-time 6-digit OTP
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              OTP expiration protection
            </li>
            <li>
              <i className="fa-solid fa-check-circle" />
              Private account lookup
            </li>
          </ul>
        </aside>

        <div className="auth-form-card">
          <h2>Forgot password</h2>
          <p className="auth-subtitle">
            {!otpSent
              ? "We will send a 6-digit OTP to your email."
              : "Enter the OTP sent to your email to continue."}
          </p>

          <form className="auth-form" onSubmit={otpSent ? verifyOtpHandler : sendOtpHandler}>
            <div className="auth-field">
              <label htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={otpSent}
                required
              />
            </div>

            {otpSent && (
              <div className="auth-field">
                <label htmlFor="reset-otp">6-digit OTP</label>
                <input
                  id="reset-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                  }
                  required
                />
              </div>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={sendingOtp || verifyingOtp}
            >
              {!otpSent
                ? sendingOtp
                  ? "Sending..."
                  : "Send OTP"
                : verifyingOtp
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </form>

          <div className="auth-footer">
            {otpSent && (
              <button
                type="button"
                className="auth-link-button"
                onClick={sendOtp}
                disabled={sendingOtp || verifyingOtp}
              >
                {sendingOtp ? "Resending..." : "Resend OTP"}
              </button>
            )}
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
