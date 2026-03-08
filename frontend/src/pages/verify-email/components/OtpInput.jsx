import React, { useRef, useEffect } from "react";

const OtpInput = ({ length = 6, value = "", onChange, disabled, className }) => {
  const inputsRef = useRef([]);

  // Auto-focus the first input on mount
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const val = e.target.value;
    // Only allow the last character entered (prevents double digits)
    const digit = val.slice(-1).replace(/[^0-9]/g, "");

    if (!digit) return;

    const otpArray = value.split("");
    otpArray[index] = digit;
    const newOtp = otpArray.join("").slice(0, length);
    onChange(newOtp);

    // Move to next input
    if (digit && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      // If current field is empty, move focus back before deleting
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
      
      const otpArray = value.split("");
      otpArray[index] = "";
      onChange(otpArray.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!paste) return;

    onChange(paste);
    
    // Focus the last filled input or the first empty one
    const nextIndex = paste.length < length ? paste.length : length - 1;
    inputsRef.current[nextIndex].focus();
  };

  return (
    <div className={`flex items-center gap-2 md:gap-3 justify-center ${className}`} onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <input
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric" // Triggers numeric keypad on mobile
            pattern="\d*"
            autoComplete="one-time-code" // Helps iOS/Android suggest the code from SMS
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            className={`
              w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold 
              bg-secondary/30 border-2 border-transparent rounded-2xl
              focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10
              transition-all duration-200 outline-none
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}
              ${value[index] ? "border-primary/50 bg-background" : ""}
            `}
          />
          {/* Optional: Visual separator after 3rd digit */}
          {index === 2 && <div className="w-2 h-1 bg-border rounded-full hidden md:block" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OtpInput;