import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Globe, LayoutDashboard, Loader2 } from "lucide-react";

export default function KYCPending() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(localStorage.getItem("kycStatus") || "pending");

  // Logic: If the backend (localStorage for now) updates to approved, 
  // we can react to it.
  useEffect(() => {
    const checkStatus = () => {
      const currentStatus = localStorage.getItem("kycStatus");
      if (currentStatus === "approved") {
        setStatus("approved");
      }
    };

    // Simulate polling the backend every 3 seconds
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] p-6 font-sans relative overflow-hidden">
      {/* Equity Brand Accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#A50034] via-[#EAAA08] to-[#A50034]"></div>

      <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl shadow-2xl p-8 text-center max-w-md w-full relative z-10">
        
        {/* Brand Icon with Glow */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#A50034] blur-3xl opacity-20 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-[#A50034] to-[#700023] p-5 rounded-2xl shadow-xl border border-white/10">
              {status === "approved" ? (
                <div className="bg-green-500 rounded-full p-1">
                   <LayoutDashboard className="w-10 h-10 text-white" />
                </div>
              ) : (
                <Clock className="w-10 h-10 text-white animate-spin-slow" />
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {status === "approved" ? "Verification Complete" : "Reviewing Your Identity"}
        </h2>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8 px-4">
          {status === "approved" 
            ? "Your identity has been confirmed. You now have full access to mPay Global features." 
            : "mPay Global is verifying your documents. This standard check keeps the African financial ecosystem secure."}
        </p>

        {/* Live Status Tracker */}
        <div className={`rounded-2xl p-5 mb-8 border transition-all duration-500 ${
          status === "approved" 
          ? "bg-green-500/10 border-green-500/20" 
          : "bg-black/40 border-white/5"
        }`}>
          <div className="flex items-center gap-4">
            {status === "approved" ? (
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            ) : (
              <Loader2 className="w-4 h-4 text-[#EAAA08] animate-spin" />
            )}
            <div className="text-left">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                status === "approved" ? "text-green-500" : "text-[#EAAA08]"
              }`}>
                {status === "approved" ? "Status: Verified" : "Status: Under Review"}
              </span>
              <p className="text-gray-500 text-[11px] mt-0.5">
                {status === "approved" ? "All systems active" : "Syncing with mPay Global nodes..."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={goToDashboard}
          className={`w-full flex items-center justify-center gap-3 transition-all duration-300 py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-lg active:scale-[0.98] ${
            status === "approved" 
            ? "bg-green-600 text-white hover:bg-green-500" 
            : "bg-white text-black hover:bg-[#EAAA08]"
          }`}
        >
          {status === "approved" ? "Enter Full Dashboard" : "Explore Limited Dashboard"}
        </button>

        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-4 opacity-50">
          <Globe size={16} className="text-gray-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            mPay Global Africa Network
          </span>
        </div>
      </div>
    </div>
  );
}