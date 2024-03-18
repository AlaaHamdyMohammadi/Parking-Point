/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
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

    if (value !== "" && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handler for input focus
  const handleFocus = (index) => {
    // Move focus to the next input field when filled
    if (confirmationCode[index] !== "" && index < length - 1) {
      document.getElementById(`confirmationInput${index + 1}`).focus();
    }
  };

  // Handler for input blur
  const handleBlur = () => {
    // Perform validation or other actions as needed
  };

  return (
    <div>
      {confirmationCode.map((value, index) => (
        <input
          key={index}
          id={`confirmationInput${index}`}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          ref={(el) => (inputRefs.current[index] = el)}
          className={` ${classes}`}
          style={{ width: "30px", marginRight: "5px" }}
        />
      ))}
    </div>
  );
};

export default ConfirmationCodeInput;
