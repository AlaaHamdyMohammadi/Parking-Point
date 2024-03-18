import React, { useState, useRef } from "react";
import classes from "./../../styles/formStyles.module.css";

const ConfirmationCodeInput = ({ length = 6, onConfirm }) => {
  const [confirmationCode, setConfirmationCode] = useState(new Array(length).fill(""));
  const inputRefs = useRef(new Array(length).fill(null));

  // Handler for input change
  const handleChange = (index, value) => {
    const newConfirmationCode = [...confirmationCode];
    newConfirmationCode[index] = value;
    setConfirmationCode(newConfirmationCode);

    // Check if all inputs are filled, then trigger onConfirm callback
    if (newConfirmationCode.every((code) => code !== "")) {
      onConfirm(newConfirmationCode.join(""));
    }

    // Move focus to the next input field
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handler for input blur
  const handleBlur = () => {
    // Perform validation or other actions as needed
  };

  return (
    <div dir="rtl">
      {" "}
      {/* Applying dir attribute for right-to-left direction */}
      {confirmationCode.map((value, index) => (
        <input
          key={index}
          id={`confirmationInput${index}`}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onBlur={handleBlur}
          /*ref={(el) => (inputRefs.current[index] = el)}*/
          className={` ${classes}`}
          style={{ width: "30px", marginRight: "5px" }}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </div>
  );
};

export default ConfirmationCodeInput;
