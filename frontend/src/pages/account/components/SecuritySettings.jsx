import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { changePassword, setTransactionPin } from "../../../services/userService";
import { logout } from "../../../services/authService";

const SecuritySettings = () => {
  const [mode, setMode] = useState("pin"); // pin | password
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [pinData, setPinData] = useState({ pin: "", confirmPin: "" });
  const [passData, setPassData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (pinData.pin.length !== 4) return setMessage({ type: "error", text: "PIN must be 4 digits" });
    if (pinData.pin !== pinData.confirmPin) return setMessage({ type: "error", text: "PINs do not match" });

    try {
      setLoading(true);
      await setTransactionPin({ pin: pinData.pin });
      setMessage({ type: "success", text: "Transaction PIN updated successfully" });
      setPinData({ pin: "", confirmPin: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to update PIN" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passData.new_password !== passData.confirm_password) {
      return setMessage({ type: "error", text: "Passwords do not match" });
    }

    try {
      setLoading(true);
      await changePassword({
        current_password: passData.current_password,
        new_password: passData.new_password,
      });
      setMessage({ type: "success", text: "Password updated successfully" });
      setPassData({ current_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to update password" });
    } finally {
      setLoading(false);
    }
  };

  // Reusable Input Style
  const inputClass = "w-full bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg px-4 py-2.5 text-sm transition-all outline-none";

  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Security</h3>
            <p className="text-xs text-muted-foreground">Manage your credentials and access</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-muted rounded-xl">
          {["pin", "password"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setMode(tab); setMessage(null); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                mode === tab ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "pin" ? "Transaction PIN" : "Password"}
            </button>
          ))}
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${
            message.type === "error" ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-green-500/10 text-green-600 border border-green-500/20"
          }`}>
            <Icon name={message.type === "error" ? "AlertCircle" : "CheckCircle"} size={16} />
            {message.text}
          </div>
        )}

        {/* PIN FORM */}
        {mode === "pin" && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground px-1">NEW PIN</label>
              <input
                type="password"
                placeholder="••••"
                value={pinData.pin}
                maxLength={4}
                onChange={(e) => setPinData({...pinData, pin: e.target.value})}
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground px-1">CONFIRM PIN</label>
              <input
                type="password"
                placeholder="••••"
                value={pinData.confirmPin}
                maxLength={4}
                onChange={(e) => setPinData({...pinData, confirmPin: e.target.value})}
                className={inputClass}
                required
              />
            </div>
            <Button className="w-full py-6 text-base" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Update Security PIN"}
            </Button>
          </form>
        )}

        {/* PASSWORD FORM */}
        {mode === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passData.current_password}
              onChange={(e) => setPassData({...passData, current_password: e.target.value})}
              className={inputClass}
              required
            />
            <div className="h-px bg-border my-2" />
            <input
              type="password"
              placeholder="New Password"
              value={passData.new_password}
              onChange={(e) => setPassData({...passData, new_password: e.target.value})}
              className={inputClass}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passData.confirm_password}
              onChange={(e) => setPassData({...passData, confirm_password: e.target.value})}
              className={inputClass}
              required
            />
            <Button className="w-full py-6 text-base" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        )}

        {/* Footer / Logout */}
        <div className="pt-6 border-t border-dashed border-border flex flex-col items-center">
            <button 
                onClick={logout}
                className="text-sm text-destructive hover:underline flex items-center gap-2 font-medium"
            >
                <Icon name="LogOut" size={14} />
                Sign out of all devices
            </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;