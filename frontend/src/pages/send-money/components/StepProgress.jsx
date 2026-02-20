import Icon from "../../../components/AppIcon";

const steps = [
  { id: 1, label: "Country" },
  { id: 2, label: "Payment Method" },
  { id: 3, label: "Details" },
  { id: 4, label: "Review" }
];

const StepProgress = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Circle */}
            <div
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                ${isCompleted ? "bg-green-500 text-white" : ""}
                ${isActive ? "bg-green-500 text-white" : ""}
                ${!isCompleted && !isActive ? "bg-gray-200 text-gray-500" : ""}
              `}
            >
              {isCompleted ? (
                <Icon name="Check" size={14} />
              ) : (
                step.id
              )}
            </div>

            {/* Label */}
            <span
              className={`ml-2 text-sm ${
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-3 ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
