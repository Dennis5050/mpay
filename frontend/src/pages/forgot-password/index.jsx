import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { requestPasswordReset } from "../../services/authService";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      await requestPasswordReset({ email });

      setSuccess(true);

    } catch (err) {

      setError(err.message || "Request failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-white px-6">

      <div className="w-full max-w-md space-y-6">

        <h2 className="text-3xl font-black text-center">
          Forgot Password
        </h2>

        {!success ? (

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>

              <label className="text-sm font-semibold">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 border rounded-xl px-4 py-3"
                />

              </div>

            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A32638] text-white rounded-xl py-3 font-bold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-bold text-[#A32638]"
              >
                Login
              </Link>
            </p>

          </form>

        ) : (

          <div className="text-center space-y-3">

            <p className="text-green-600 font-semibold">
              Password reset link sent to your email
            </p>

            <Link
              to="/login"
              className="text-[#A32638] font-bold"
            >
              Back to Login
            </Link>

          </div>

        )}

      </div>

    </div>

  );

}