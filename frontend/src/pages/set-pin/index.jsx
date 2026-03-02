import React, { useState, useEffect } from "react";
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

  // Clear error when user starts typing again
  useEffect(() => {
    if (error) setError("");
  }, [pin, confirmPin]);

  // =====================
  // Security Validation
  // =====================
  const isWeakPin = (val) => {
    const sequences = ["1234", "4321", "0000", "1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"];
    return sequences.includes(val);
  };

  const validate = () => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return false;
    }
    if (isWeakPin(pin)) {
      setError("PIN is too simple. Try a more secure combination.");
      return false;
    }
    if (pin !== confirmPin) {
      setError("The PINs you entered do not match");
      return false;
    }
    return true;
  };

  // =====================
  // Submit Handler
  // =====================
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

      if (!res.ok) {
        throw new Error(data.message || "Failed to update security PIN");
      }

      // Success feedback could go here (e.g., a toast)
      navigate("/kyc");

    } catch (err) {
      setError(err.message || "Connection failed. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 text-center animate-in fade-in zoom-in duration-300">
        
        {/* Visual Header */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
            <Icon name="ShieldCheck" size={40} className="text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Secure Your Account
            </h1>
            <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
              Create a 4-digit transaction PIN to authorize transfers and withdrawals.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Create PIN
              </label>
              <PinInput 
                value={pin} 
                onChange={setPin} 
                disabled={loading} 
                mask // Ensure your PinInput supports masking for security
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Confirm PIN
              </label>
              <PinInput 
                value={confirmPin} 
                onChange={setConfirmPin} 
                disabled={loading}
                mask
              />
            </div>
          </div>

          {/* Error Message Area */}
          <div className="min-h-[24px]"> 
            {error && (
              <p className="text-sm text-destructive font-medium flex items-center justify-center gap-2 animate-bounce">
                <Icon name="AlertCircle" size={16} />
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            iconName="Lock"
            iconPosition="left"
            className="h-14 text-lg shadow-lg shadow-primary/20"
          >
            Finalize Security
          </Button>
        </form>

        {/* Security Footer */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
            <Icon name="Shield" size={14} className="text-success" />
            Bank-grade 256-bit encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPin;