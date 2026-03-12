import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

import { changePassword } from "../../../services/userService";
import { logout } from "../../../services/authService";

const SecuritySettings = () => {

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        current_password: form.current_password,
        new_password: form.new_password
      });

      setMessage({ type: "success", text: "Password updated successfully" });

      setForm({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });

    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to update password" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAll = () => {
    logout();
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-border flex items-center gap-2">
        <Icon name="Shield" size={18} className="text-primary" />
        <h3 className="font-bold text-foreground">Security Settings</h3>
      </div>

      <div className="p-6 space-y-6">

        {/* Password Change */}
        <form onSubmit={handlePasswordChange} className="space-y-4">

          <h4 className="text-sm font-bold text-muted-foreground uppercase">
            Change Password
          </h4>

          <input
            type="password"
            name="current_password"
            placeholder="Current Password"
            value={form.current_password}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm"
            required
          />

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm"
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password"
            value={form.confirm_password}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm"
            required
          />

          {message && (
            <div
              className={`text-sm ${
                message.type === "error"
                  ? "text-destructive"
                  : "text-success"
              }`}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>

        </form>

        {/* Divider */}
        <div className="border-t border-border pt-6">

          <h4 className="text-sm font-bold text-muted-foreground uppercase mb-3">
            Sessions
          </h4>

          <Button
            variant="destructive"
            onClick={handleLogoutAll}
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Logout
          </Button>

        </div>

      </div>
    </div>
  );
};

export default SecuritySettings;