/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useDispatch } from "react-redux";
import { loggedInState, login } from "../../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";
const ConfirmationCodeInput = ({ length = 6, onConfirm }) => {
  const { t } = useTranslation();
  const [confirmationCode, setConfirmationCode] = useState(
    new Array(length).fill("")
  );
  const inputRefs = useRef(new Array(length).fill(null));
  const dispatch = useDispatch();
  // console.log(token);
  const handleChange = async (index, value) => {
    const newConfirmationCode = [...confirmationCode];
    newConfirmationCode[index] = value;
    //console.log(newConfirmationCode);
    setConfirmationCode(newConfirmationCode);
    // Check if all inputs are filled, then trigger onConfirm callback
    if (newConfirmationCode.every((code) => code !== "")) {
      onConfirm(newConfirmationCode.join(""));
      try {
        const res = await axiosInstanceParking.post(`/users/me/confirm-email`, {
          token: newConfirmationCode.join(""),
        });
        dispatch(login(res.data.token));
        dispatch(loggedInState());
        toast.success(t("ConfirmationCodeInput.successToast1"), {
          onClose: () => {
            window.location.reload();
          },
        });
      } catch (error) {
        toast.error(t("ConfirmationCodeInput.errorToast1"));
        console.error("Error occurred while confirming email:", error);
        if (error.response) {
          toast.error(t("ConfirmationCodeInput.errorToast2"));

          console.error("Response data:", error.response.data);
        }
      }
    }

    // Move focus to the next input field
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = async (e, index) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text").trim();
    const newConfirmationCode = pastedData.split("").slice(0, length);
    setConfirmationCode(newConfirmationCode);
    //console.log(newConfirmationCode);
    //console.log(confirmationCode);
    if (newConfirmationCode.every((code) => code !== "")) {
      onConfirm(newConfirmationCode.join(""));
      try {
        const res = await axiosInstanceParking.post(`/users/me/confirm-email`, {
          token: newConfirmationCode.join(""),
        });

        dispatch(login(res.data.token));
        dispatch(loggedInState());
        toast.success(t("ConfirmationCodeInput.successToast2"), {
          onClose: () => {
            window.location.reload();
          },
        });
      } catch (error) {
        console.error("Error occurred while confirming email:", error);
        if (error.response) {
          toast.error(t("ConfirmationCodeInput.errorToast2"));
          console.error("Response data:", error.response.data);
        }
      }
    }

    // Set the value of the input fields to the pasted OTP code
    inputRefs.current.forEach((inputRef, i) => {
      if (inputRef && index + i < index + pastedData.length) {
        inputRef.value = pastedData.charAt(i);
      }
    });
  };

  return (
    <div dir="ltr">
      {confirmationCode.map((value, index) => (
        <input
          key={index}
          id={`confirmationInput${index}`}
          type="text"
          maxLength={1}
          value={value || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          // onBlur={handleBlur}
          onPaste={(e) => handlePaste(e, index)}
          className={` ${classes.inputconfirm} text-center `}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ConfirmationCodeInput;
