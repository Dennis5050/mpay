import React, { useRef, useEffect } from "react";

const PinInput = ({ length = 4, value = "", onChange, disabled }) => {
  const inputsRef = useRef([]);

  // Sync internal refs with external value if needed (e.g., on clear)
  useEffect(() => {
    if (value === "") {
      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
      inputsRef.current[0]?.focus();
    }
  }, [value]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newValue = value.split("");
    
    // Take only the last character typed
    const char = val.charAt(val.length - 1);
    newValue[index] = char;
    
    const pinString = newValue.join("");
    onChange(pinString);

    // Auto-focus next
    if (char && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        // If current is empty, move back and clear previous
        const newValue = value.split("");
        newValue[index - 1] = "";
        onChange(newValue.join(""));
        inputsRef.current[index - 1].focus();
      } else {
        // Clear current
        const newValue = value.split("");
        newValue[index] = "";
        onChange(newValue.join(""));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    
    if (pasteData) {
      onChange(pasteData);
      // Focus the appropriate input after paste
      const nextIndex = Math.min(pasteData.length, length - 1);
      inputsRef.current[nextIndex].focus();
    }
  };

  return (
    <div className="flex justify-center gap-4" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text" // Using text with inputMode for better mobile numeric keyboard
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className={`
            w-14 h-16 text-center text-2xl font-bold 
            border-2 rounded-2xl transition-all duration-200
            ${disabled ? "bg-muted text-muted-foreground opacity-50" : "bg-card text-foreground"}
            ${value[index] ? "border-primary" : "border-border"}
            focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none
            placeholder:text-muted-foreground/30
          `}
          placeholder="○"
          style={{ WebkitTextSecurity: "disc" }} // This masks the text while allowing numeric keyboards
        />
      ))}
    </div>
  );
};

export default PinInput;