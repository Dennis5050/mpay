import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import PinInput from "./components/PinInput";

const SetPin = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-clear error when user modifies inputs
  useEffect(() => {
    if (error) setError("");
  }, [pin, confirmPin]);

  // Security Validation Logic
  const isWeakPin = useMemo(() => {
    const weakPatterns = [
      "1234", "4321", "0000", "1111", "2222", "3333", 
      "4444", "5555", "6666", "7777", "8888", "9999", "2580"
    ];
    return weakPatterns.includes(pin);
  }, [pin]);

  const validate = () => {
    if (pin.length !== 4) {
      setError("Please complete your 4-digit PIN.");
      return false;
    }
    if (isWeakPin) {
      setError("This PIN is too easy to guess. Choose another.");
      return false;
    }
    if (pin !== confirmPin) {
      setError("The PINs do not match. Please try again.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/auth/set-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ pin })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save security PIN");

      // Success: Proceed to KYC/Dashboard
      navigate("/kyc");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] p-6">
      {/* Abstract Security Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-xl p-8 md:p-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto ring-4 ring-primary/5">
            <Icon name="Lock" size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
              Set Security PIN
            </h1>
            <p className="text-[15px] text-slate-500 dark:text-zinc-400">
              Create a transaction PIN to keep your transfers and payments secure.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-8">
            {/* PIN Entry */}
            <div className="space-y-3 flex flex-col items-center">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                New 4-Digit PIN
              </label>
              <PinInput 
                value={pin} 
                onChange={setPin} 
                disabled={loading} 
                mask
                length={4}
              />
              {pin.length === 4 && isWeakPin && (
                <p className="text-[11px] text-amber-500 font-bold flex items-center gap-1">
                  <Icon name="ShieldAlert" size={12} /> WEAK PIN
                </p>
              )}
            </div>

            {/* Confirm PIN Entry */}
            <div className="space-y-3 flex flex-col items-center">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                Confirm PIN
              </label>
              <PinInput 
                value={confirmPin} 
                onChange={setConfirmPin} 
                disabled={loading}
                mask
                length={4}
              />
            </div>
          </div>

          {/* Validation Feedback */}
          <div className="min-h-[20px]">
            {error && (
              <div className="flex items-center justify-center gap-2 text-sm text-red-500 font-medium animate-in slide-in-from-top-1">
                <Icon name="AlertCircle" size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              disabled={pin.length < 4 || confirmPin.length < 4}
              className="h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Set Security PIN
            </Button>

            <div className="flex items-center justify-center gap-2 py-2 text-[12px] text-slate-400 font-medium bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
              <Icon name="ShieldCheck" size={14} className="text-emerald-500" />
              Your security is our top priority
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetPin;