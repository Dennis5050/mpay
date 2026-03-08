import React, { useRef, useEffect } from "react";

const PinInput = ({ length = 4, value = "", onChange, disabled, mask = true }) => {
  const inputsRef = useRef([]);

  // Focus management: focus first empty input or the last input if full
  useEffect(() => {
    const nextIndex = value.length < length ? value.length : length - 1;
    if (inputsRef.current[nextIndex] && !disabled) {
      // Small timeout ensures the DOM is ready if this is rendered inside a modal/animation
      const timer = setTimeout(() => inputsRef.current[nextIndex].focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [disabled, length]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (disabled) return;

    const newValue = value.split("");
    // We only care about the last character entered in this specific box
    const char = val.charAt(val.length - 1);
    newValue[index] = char;
    
    const pinString = newValue.join("").slice(0, length);
    onChange(pinString);

    // Auto-focus next box if we just entered a character
    if (char && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        // Current is empty, move back and clear the previous box
        const newValue = value.split("");
        newValue[index - 1] = "";
        onChange(newValue.join(""));
        inputsRef.current[index - 1].focus();
      } else {
        // Clear current box
        const newValue = value.split("");
        newValue[index] = "";
        onChange(newValue.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    
    if (pasteData) {
      onChange(pasteData);
      // Focus the last input or the next empty one
      const focusTarget = pasteData.length === length ? length - 1 : pasteData.length;
      inputsRef.current[focusTarget].focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 md:gap-4" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => {
        const isActive = value.length === index;
        const isFilled = value[index] !== undefined && value[index] !== "";

        return (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            placeholder={!isFilled ? "•" : ""}
            className={`
              w-14 h-16 md:w-16 md:h-20 text-center text-2xl font-bold 
              rounded-2xl border-2 transition-all duration-150 outline-none
              ${disabled 
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed" 
                : "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white cursor-text"
              }
              ${isFilled 
                ? "border-primary shadow-sm scale-105" 
                : "border-slate-200 dark:border-zinc-700"
              }
              ${isActive && !disabled ? "border-primary ring-4 ring-primary/10 bg-primary/[0.02]" : ""}
              placeholder:text-slate-300 dark:placeholder:text-zinc-600
            `}
            style={{ 
              WebkitTextSecurity: mask ? "disc" : "none",
              // Fixes a bug in some browsers where the dot isn't centered vertically
              lineHeight: "0" 
            }}
          />
        );
      })}
    </div>
  );
};

export default PinInput;