import React from "react";
import Icon from "../../../components/AppIcon";

// Make steps configurable (future: Deposit / Withdraw may differ)
const DEFAULT_STEPS = [
  { id: 1, label: "Country" },
  { id: 2, label: "Method" },
  { id: 3, label: "Details" },
  { id: 4, label: "Review" }
];

const StepProgress = ({ currentStep = 1, steps = DEFAULT_STEPS }) => {
  return (
    <div
      className="flex items-center justify-between mb-6 overflow-x-auto"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-valuenow={currentStep}
    >
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isPending = currentStep < step.id;

        const circleClass = `
          flex items-center justify-center
          w-8 h-8 rounded-full text-sm font-semibold transition
          ${
            isCompleted || isActive
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"
          }
        `;

        const lineClass = `
          flex-1 h-[2px] mx-3 transition
          ${currentStep > step.id ? "bg-primary" : "bg-border"}
        `;

        return (
          <div key={step.id} className="flex items-center flex-1 min-w-max">
            {/* Circle */}
            <div className={circleClass}>
              {isCompleted ? (
                <Icon name="Check" size={14} />
              ) : (
                step.id
              )}
            </div>

            {/* Label */}
            <span
              className={`ml-2 text-sm whitespace-nowrap ${
                isActive
                  ? "text-foreground font-medium"
                  : isPending
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {step.label}
            </span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={lineClass} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;