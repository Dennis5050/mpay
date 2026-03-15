import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import OtpInput from "./components/OtpInput";

const VerifyEmail = () => {

  const navigate = useNavigate();
  const API_URL = "https://api.mpay.africa/api";

  const email = sessionStorage.getItem("mpay_verify_email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const [success, setSuccess] = useState(false);

  /* Protect route */
useEffect(() => {
  if (!email && !success) {
    navigate("/register");
  }
}, [email, success, navigate]);
  /* Countdown Timer */
  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;

  };

  /* Verify OTP */
  const handleVerify = useCallback(async (otpValue = otp) => {

    if (!email || otpValue.length !== 6) return;

    setLoading(true);
    setError("");

    try {

      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          email,
          otp: otpValue
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid verification code");
      }

      /* Save session */

      if (data.token) {
        localStorage.setItem("mpay_token", data.token);
      }

      if (data.user) {
        localStorage.setItem("mpay_user", JSON.stringify(data.user));
      }

      if (data.onboarding_step) {
        localStorage.setItem("mpay_onboarding_step", data.onboarding_step);
      }

      sessionStorage.removeItem("mpay_verify_email");

      /* Show celebration */
      setSuccess(true);

      /* Redirect after animation */
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

    } catch (err) {

      setError(err.message || "Verification failed");
      setOtp("");

    } finally {

      setLoading(false);

    }

  }, [otp, email, navigate]);

  /* Auto submit when OTP complete */
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify(otp);
    }
  }, [otp, handleVerify]);

  /* Resend OTP */
  const handleResend = async () => {

    if (!email) return;

    setResendLoading(true);
    setError("");

    try {

      const res = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setTimer(240);
      setOtp("");

    } catch (err) {

      setError(err.message || "We couldn't resend the code.");

    } finally {

      setResendLoading(false);

    }

  };

  /* Celebration Screen */

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] p-6">

        <Confetti numberOfPieces={200} recycle={false} />

        <div className="text-center space-y-6">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-bounce">
            <Icon name="CheckCircle" size={42} className="text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome to Mpay 🎉
          </h1>

          <p className="text-slate-500 dark:text-zinc-400">
            Your account has been verified successfully.
            <br />
            You're ready to start using Mpay.
          </p>

          <p className="text-sm text-muted-foreground animate-pulse">
            Proceeding  to dashboard...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] p-6">

      {/* Brand */}
      <div className="mb-12">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Icon name="ShieldCheck" size={28} className="text-white" />
        </div>
      </div>

      <div className="w-full max-w-[420px] space-y-8">

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Verify your account
          </h1>

          <p className="text-slate-500 dark:text-zinc-400 text-[15px]">
            We've sent a 6-digit code to
            <br />
            <span className="font-semibold text-slate-900 dark:text-zinc-200">
              {email}
            </span>
          </p>
        </div>

        <div className="space-y-6">

          <div className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800">

            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
              length={6}
            />

            {error && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-red-500">
                <Icon name="AlertCircle" size={16} />
                {error}
              </div>
            )}

          </div>

          <Button
            onClick={() => handleVerify()}
            fullWidth
            size="lg"
            loading={loading}
            disabled={otp.length !== 6}
            className="h-14 rounded-2xl font-bold"
          >
            Confirm & Continue
          </Button>

          <div className="text-center">

            {timer > 0 ? (
              <p className="text-sm text-slate-400">
                Didn't receive it? Resend in{" "}
                <span className="font-mono font-bold">
                  {formatTime(timer)}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-sm font-bold text-primary flex items-center justify-center gap-2 mx-auto"
              >
                <Icon
                  name="RotateCcw"
                  size={16}
                  className={resendLoading ? "animate-spin" : ""}
                />
                {resendLoading ? "Resending..." : "Resend Code"}
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default VerifyEmail;