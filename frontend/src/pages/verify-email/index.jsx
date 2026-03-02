import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import OtpInput from "./components/OtpInput";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL;
  const email = location.state?.email || "your email";
  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  // Countdown Logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Format timer as 0:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the full 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Invalid or expired code");

      navigate("/set-pin");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    try {
      await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setTimer(60);
      setOtp(""); // Clear OTP on resend
    } catch {
      setError("Failed to resend code. Please check your connection.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Visual Header */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
            <Icon name="MailCheck" size={40} className="text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Verify your email
            </h1>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-muted-foreground">
                We've sent a 6-digit verification code to
              </p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{email}</span>
                <button 
                  onClick={() => navigate(-1)} 
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="space-y-8">
          <div className="py-2">
            <OtpInput value={otp} onChange={setOtp} disabled={loading} length={6} />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 flex items-center justify-center gap-2 text-destructive text-sm font-medium animate-shake">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              className="h-14 text-lg shadow-lg shadow-primary/20"
            >
              Verify Identity
            </Button>

            {/* Resend Logic */}
            <div className="text-sm font-medium">
              {timer > 0 ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Resend code in <b className="text-foreground">{formatTime(timer)}</b></span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-primary hover:text-primary/80 transition-colors font-bold flex items-center justify-center gap-2 mx-auto"
                >
                  <Icon name="RotateCcw" size={16} className={resendLoading ? "animate-spin" : ""} />
                  {resendLoading ? "Resending..." : "Resend Code"}
                </button>
              )}
            </div>
          </div>
        </form>

        <p className="text-xs text-muted-foreground pt-4 border-t border-border/50">
          Didn't receive the email? Check your spam folder or try another email address.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;