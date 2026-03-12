import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Verified = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">

      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-10 text-center max-w-md w-full border border-slate-100">

        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-2">
          KYC Verified
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Your identity verification has been completed successfully.
          You now have full access to your account features.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-[#A32A29] text-white py-4 rounded-2xl font-bold uppercase tracking-wide hover:bg-[#8e2423] transition-all shadow-lg shadow-red-900/20"
        >
          Continue to Dashboard
        </button>

      </div>

    </div>
  );
};

export default Verified;