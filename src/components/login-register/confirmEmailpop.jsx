import ConfirmationCodeInput from "./confirmEmail";
import classes from "./../../styles/formStyles.module.css";
import "react-toastify/dist/ReactToastify.css";
import useSendCode from "../../../hook/useSendCode";
import CountdownTimer from "./CountdownTimer";

export default function ConfimEmailPop({ userEmail }) {
  const handleChange = useSendCode();
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
              <p className="fs-6 pt-2 px-2 text-justify">
                شكرا لتسجيلك معنا! لقد تم إرسال رمز التحقق إلى عنوان بريدك
                الإلكتروني المُسجّل
                <span className={`${classes.resendcode} px-1`}>
                  {userEmail}
                </span>{" "}
                يُرجى فتح بريدك الإلكتروني ونسخ الرمز المُرسل
              </p>
            </div>
            <div className="modal-footer d-flex  justify-content-between">
              <div
                className={`${classes.resendcode} pointer  fw-semibold`}
                onClick={handleChange}
              >
                إعادة إرسال رمز التأكيد
              </div>
              <span className="text-secondary  ">
                إرسال الرمز خلال <CountdownTimer /> دقائق
              </span>{" "}
              *
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
