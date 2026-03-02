import { useNavigate } from "react-router-dom";

export default function KYCPending() {
  const navigate = useNavigate();

  const approveDev = () => {
    // simulate admin approval
    localStorage.setItem("kycStatus", "approved");
    localStorage.setItem("kycLevel", "4");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-white rounded-xl shadow p-8 text-center space-y-4 max-w-md w-full">
        <h2 className="text-xl font-bold">KYC Submitted</h2>
        <p className="text-sm text-gray-500">
          Your documents are under review.
        </p>

        {/* Dev button */}
        <button
          onClick={approveDev}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Approve KYC (Dev)
        </button>
      </div>
    </div>
  );
}