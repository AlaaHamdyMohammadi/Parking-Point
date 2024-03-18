/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ConfirmationCodeInput from "./confirmEmail";
import classes from "./../../styles/formStyles.module.css";

const ForgotPassword = () => {
  const [registeUser, setRegisteUser] = React.useState({ email: "" });

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
                  src="./../../../public/images/Mail sent-amico (1).png"
                  alt=""
                />
              </div>
              <div className="d-flex flex-column mb-2 ">
                <label className="">من فضلك ادخل بريدك الإلكتروني:</label>
                <input
                  type="email"
                  className="w-75 mt-2 text-left"
                  value={registeUser.email}
                  onChange={(e) => setRegisteUser({ ...registeUser, email: e.target.value })}
                />
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  className="btn"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  style={{
                    backgroundColor: "#422852",
                    color: "#f1a525",
                    fontWeight: "bold",
                  }}
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <ConfirmationCodeInput
                  length={6}
                  onConfirm={(code) => console.log("Confirmed:", code)}
                />
                <p className="fs-6 py-3 px-4 text-justify-center">
                  شكرا لتسجيلك معنا! لقد تم إرسال رمز التحقق إلى عنوان بريدك
                  الإلكتروني المُسجّل
                  <span className={`${classes.resendcode}`}>
                    {registeUser.email}
                  </span>{" "}
                  يُرجى فتح بريدك الإلكتروني والبحث عن رسالة منّا. بمجرد العثور
                  على الرسالة، يُرجى فتحها ونسخ الرمز المُرسل.إذا كنت بحاجة إلى
                  مساعدة، فلا تتردد في الاتصال بفريق الدعم .
                </p>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                className="btn"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                style={{
                  backgroundColor: "#422852",
                  color: "#f1a525",
                  fontWeight: "bold",
                }}
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
