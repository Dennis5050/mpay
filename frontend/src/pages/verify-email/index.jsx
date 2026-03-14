import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import OtpInput from "./components/OtpInput";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = "https://api.mpay.africa/api";
  // Fallback to a placeholder if state is missing
  const email = localStorage.getItem("email") || "your email";
  
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerify = useCallback(async (otpValue = otp) => {
    if (otpValue.length !== 6) return;

    setLoading(true);
    setError("");


    try {
        const userEmail = localStorage.getItem("email") || "your email";
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include token if your registration returns a temporary one
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({ email: userEmail , otp: otpValue })
      });
      console.log(userEmail,otpValue);


      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "The code you entered is invalid.");
      console.log(data);

      // Success: Proceed to final step or Dashboard
      navigate("/set-pin"); 
    } catch (err) {
      setError(err.message);
      setOtp(""); 
    } finally {
      setLoading(false);
    }
  }, [otp, email, navigate, API_URL]);

  // Auto-submit when 6 digits are reached
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify(otp);
    }
  }, [otp, handleVerify]);

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
      setOtp("");
    } catch {
      setError("We couldn't resend the code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] p-6">
      
      {/* Top Brand/Logo Area */}
      <div className="mb-12">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Icon name="ShieldCheck" size={28} className="text-white" />
        </div>
      </div>

      <div className="w-full max-w-[420px] space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Verify your account
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-[15px] leading-relaxed">
            We've sent a 6-digit verification code to <br />
            <span className="text-slate-900 dark:text-zinc-200 font-semibold">{email}</span>
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800">
            <OtpInput 
              value={otp} 
              onChange={setOtp} 
              disabled={loading} 
              length={6} 
            />
            
            {error && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-red-500 font-medium animate-in fade-in zoom-in-95">
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
            className="h-14 rounded-2xl text-base font-bold shadow-md transition-transform active:scale-[0.98]"
          >
            Confirm & Continue
          </Button>

          {/* Resend Logic */}
          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-slate-400">
                Didn't receive it? Resend in <span className="text-slate-900 dark:text-zinc-300 font-mono font-bold">{formatTime(timer)}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="text-sm font-bold text-primary hover:text-primary/80 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <Icon name="RotateCcw" size={16} className={resendLoading ? "animate-spin" : ""} />
                {resendLoading ? "Resending..." : "Resend Code"}
              </button>
            )}
          </div>
        </div>

        {/* Support Footer */}
        <div className="pt-8 text-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors"
          >
            ← Back to registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;