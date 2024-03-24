import React, { useState, useRef } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useDispatch, useSelector } from "react-redux";
import { loggedInState, login } from "../../store/slices/authSlice";

const ConfirmationCodeInput = ({ length = 6, onConfirm }) => {
  const [confirmationCode, setConfirmationCode] = useState(new Array(length).fill(""));
  const inputRefs = useRef(new Array(length).fill(null));
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);
  console.log(token);
  // Handler for input change
  const handleChange = async (index, value) => {
    const newConfirmationCode = [...confirmationCode];
    newConfirmationCode[index] = value;
    setConfirmationCode(newConfirmationCode);

    // Check if all inputs are filled, then trigger onConfirm callback
    if (newConfirmationCode.every((code) => code !== "")) {
      onConfirm(newConfirmationCode.join(""));
      try {
        const res = await axiosInstanceParking.post(`/users/me/confirm-email`, { token: newConfirmationCode.join("") }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(login(res.data.token));
        dispatch(loggedInState());
      } catch (error) {
        console.error("Error occurred while confirming email:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
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
    <div dir="ltr">
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
          style={{ width: "20px", marginRight: "5px" }}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </div>
  );
};

export default ConfirmationCodeInput;
