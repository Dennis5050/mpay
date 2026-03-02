import React, { useRef } from "react";

const OtpInput = ({ length = 6, value, onChange, disabled }) => {
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");

    if (!val) return;

    const newValue = value.split("");
    newValue[index] = val[0];
    const otp = newValue.join("");
    onChange(otp);

    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");
      newValue[index] = "";
      onChange(newValue.join(""));

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!paste) return;

    const otp = paste.slice(0, length);
    onChange(otp);

    otp.split("").forEach((digit, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = digit;
      }
    });
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          defaultValue={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-bold border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
        />
      ))}
    </div>
  );
};

export default OtpInput;