export default function KYCProgress({ stepsCompleted = 4 }) {
  const steps = [
    "Account Created",
    "Verify Email",
    "Set PIN",
    "Complete KYC"
  ];

  const percent = (stepsCompleted / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow border">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Onboarding Progress</h3>
        <span className="text-green-600 text-sm font-medium">
          {stepsCompleted}/{steps.length}
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="space-y-2 text-sm">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${index < stepsCompleted ? "bg-green-500" : "bg-gray-300"}`} />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
