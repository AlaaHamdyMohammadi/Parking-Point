import React from "react";
import ConfirmationCodeInput from "./confirmEmail";
import classes from "./../../styles/formStyles.module.css";
import CountdownTimer from "./CountdownTimer";
import { useSelector } from "react-redux";
import axiosInstanceParking from "../../axiosConfig/instanc";
import "react-toastify/dist/ReactToastify.css";

export default function ConfimEmailPop({ userEmail }) {
  const token = useSelector((state) => state.loggedIn.token);
  const handleChange = async () => {
    try {
      const res = await axiosInstanceParking.get(`/users/me/confirm-email`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("send:", res);
    } catch (error) {
      console.error("Error occurred while confirming email:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

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
              <button type="button" className="btn-close fs-6" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <div className="text-center">
                <img
                  style={{ height: "16rem", width: "16rem" }}
                  src="./../../../public/images/Mail sent-amico (1).png"
                  alt=""
                />
              </div>
              <div className="text-center">
                <ConfirmationCodeInput length={6} onConfirm={(code) => code} />
              </div>
              <p className="fs-6 pt-2 px-2 text-end text-justify">
                شكرا لتسجيلك معنا! لقد تم إرسال رمز التحقق إلى عنوان بريدك الإلكتروني المُسجّل
                <span className={`${classes.resendcode} px-1`}>{userEmail}</span> يُرجى فتح بريدك الإلكتروني والبحث عن رسالة
                منّا. بمجرد العثور على الرسالة، يُرجى فتحها ونسخ الرمز المُرسل
              </p>
            </div>
            <div className="modal-footer d-flex  justify-content-between">
              <div className={`${classes.resendcode} pointer fs-6 fw-bold`} onClick={handleChange}>
                إعادة إرسال رمز التأكيد
              </div>

              <span className="text-secondary  fs-6">
                إرسال الرمز خلال <CountdownTimer /> دقائق
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
