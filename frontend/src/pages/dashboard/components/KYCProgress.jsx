import { useNavigate } from "react-router-dom";

export default function KYCProgress({
  stepsCompleted = 3,
  kycStatus = "not_started", // not_started | pending | approved | rejected
}) {
  const navigate = useNavigate();

  const steps = [
    "Account Created",
    "Verify Email",
    "Set PIN",
    "Complete KYC",
  ];

  // If KYC approved → onboarding fully complete
  const effectiveSteps =
    kycStatus === "approved" ? steps.length : stepsCompleted;

  const percent = (effectiveSteps / steps.length) * 100;

  const statusMessages = {
    not_started: "Complete identity verification to unlock full features",
    pending: "Your KYC is under review (2–24 hrs)",
    approved: "Your account is fully verified",
    rejected: "Verification failed. Please resubmit",
  };

  const buttonText = {
    not_started: "Complete KYC",
    pending: "View Status",
    rejected: "Resubmit KYC",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow border">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Onboarding Progress</h3>
        <span className="text-green-600 text-sm font-medium">
          {effectiveSteps}/{steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2 text-sm mb-4">
        {steps.map((step, index) => {
          const completed =
            index < effectiveSteps ||
            (index === steps.length - 1 && kycStatus === "approved");

          return (
            <div key={index} className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  completed ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              {step}
            </div>
          );
        })}
      </div>

      {/* Status message */}
      {kycStatus !== "approved" && (
        <p className="text-xs text-gray-500 mb-3">
          {statusMessages[kycStatus]}
        </p>
      )}

      {/* Action button */}
      {kycStatus !== "approved" && (
        <button
          onClick={() => navigate("/kyc")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          {buttonText[kycStatus]}
        </button>
      )}
    </div>
  );
}