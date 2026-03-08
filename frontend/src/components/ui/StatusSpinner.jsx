import React from "react";
import { Check, X } from "lucide-react";

/**
 * STATUS SPINNER (Success / Failed)
 * @param {string} status - success | failed
 * @param {string} size - md | lg | xl
 */
const StatusSpinner = ({ status = "success", size = "xl" }) => {
  const sizes = {
    md: "h-12 w-12 border-2",
    lg: "h-20 w-20 border-4",
    xl: "h-32 w-32 border-4"
  };

  const iconSizes = {
    md: 20,
    lg: 32,
    xl: 56
  };

  const isSuccess = status === "success";

  return (
    <div className="relative flex items-center justify-center">
      {/* The Result Ring */}
      <div 
        className={`rounded-full transition-all duration-500 ease-out shadow-xl
          ${sizes[size]} 
          ${isSuccess 
            ? "border-green-500 bg-green-50 scale-110 shadow-green-100" 
            : "border-red-500 bg-red-50 scale-105 shadow-red-100"}`}
      />

      {/* The Result Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isSuccess ? (
          <Check 
            size={iconSizes[size]} 
            className="text-green-600 animate-in zoom-in fade-in duration-500" 
            strokeWidth={3} 
          />
        ) : (
          <X 
            size={iconSizes[size]} 
            className="text-red-600 animate-in zoom-in fade-in duration-500" 
            strokeWidth={3} 
          />
        )}
      </div>
    </div>
  );
};

export default StatusSpinner;