/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ConfirmationCodeInput from "./confirmEmail";
import classes from "./../../styles/formStyles.module.css";
import "react-toastify/dist/ReactToastify.css";
import useSendCode from "../../../hook/useSendCode";
import CountdownTimer from "./CountdownTimer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ConfimEmailPop({ userEmail }) {
  const { t } = useTranslation();
  const [resetTimer, setResetTimer] = useState(false); // State to trigger timer reset
  const handleChange = useSendCode();

  // Function to reset the timer
  const handleResetTimer = () => {
    setResetTimer((prev) => !prev);
  };
  const language = useSelector((state) => state.language.language);

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close fs-6"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div className="text-center">
                <img
                  style={{ height: "16rem", width: "16rem" }}
                  src="/images/Mail sent-amico (1).png"
                  alt=""
                />
              </div>
              <div className="text-center">
                <ConfirmationCodeInput length={6} onConfirm={(code) => code} />
              </div>
              <p
                align="justify"
                className={`fs-6 pt-2 px-2 ${
                  language == "ar" ? "text-end" : "text-start"
                }`}
              >
                {t("confirmEmailPop1")}
                <span className={`${classes.resendcode} px-1`}>
                  {userEmail}
                </span>
                {t("confirmEmailPop2")}
              </p>
            </div>
            <div className="modal-footer d-flex mx-2 justify-content-between">
              <div
                className={`${classes.resendcode} pointer fs-6 fw-semibold`}
                onClick={() => {
                  handleChange();
                  handleResetTimer();
                }}
              >
                {t("confirmEmailPop3")}
              </div>
              <span className="text-secondary fs-6 ">
                {t("confirmEmailPop4")}
                <CountdownTimer resetTimer={resetTimer} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
