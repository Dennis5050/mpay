import React from "react";

/**
 * REUSABLE LOADING SPINNER
 * @param {string} size - xs | sm | md | lg | xl
 * @param {string} color - white | primary | gold | dark
 */
const LoadingSpinner = ({ size = "md", color = "primary", className = "" }) => {
  const sizes = {
    xs: "h-3 w-3 border",
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
    xl: "h-16 w-16 border-4"
  };

  const colors = {
    white: "border-white/30 border-t-white",
    primary: "border-[#A32638]/20 border-t-[#A32638]",
    gold: "border-[#FFB612]/20 border-t-[#FFB612]",
    dark: "border-[#5C2D25]/20 border-t-[#5C2D25]"
  };

  return (
    <div 
      className={`animate-spin rounded-full ${sizes[size]} ${colors[color]} ${className}`} 
      role="status"
      aria-label="loading"
    />
  );
};

export default LoadingSpinner;