/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import classes from "./../../../styles/formStyles.module.css";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosInstanceParking from "../../../axiosConfig/instanc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [registeUser, setRegisteUser] = React.useState({ email: "" });
  const [codeconfirmed, setCodeconfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [esc, setEsc] = useState(false);
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = useState(false);

  const [errors, setErrors] = React.useState({
    passwordErrors: "*",
    confirmPasswordErrors: "*",
    tokenErrors: "*",
    emailErrors: "*",
  });
  const { t } = useTranslation();
  let passwordRegx = /^[a-zA-Z0-9]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const registeValidation = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setErrors({
        ...errors,
        passwordErrors:
          value.length === 0
            ? t("registerPass1")
            : value.length <= 7
            ? t("registerPass2")
            : passwordRegx.test(value)
            ? ""
            : t("registerPass3"),
      });
      setPassword(value);
    }
    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPasswordErrors:
          value.length === 0
            ? t("registerConfirmPass1")
            : value == password
            ? ""
            : t("registerConfirmPass2"),
      });
      setConfirmPassword(value);
    }
    if (name === "email") {
      setErrors({
        ...errors,
        emailErrors:
          value.length === 0
            ? t("emailInp2")
            : emailRegex.test(value)
            ? ""
            : t("emailInp1"),
      });
      setEmail(value);
    }
    if (name === "otp") {
      setErrors({
        ...errors,
        tokenErrors:
          value.length === 0
            ? t("forgetPass1")
            : value.length !== 6
            ? t("forgetPass2")
            : "",
      });
      setToken(value);
    }
    // setRegisteUser({ ...registeUser, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleForgotPassword() {
    try {
      const res = await axiosInstanceParking.post("/users/me/forget-password", {
        email,
      });
      setEnterOtp(true);
      console.log(registeUser);
    } catch (error) {
      // toast.error("لا يوجد حساب مسجل علي هذا البريد الالكتروني");
      setErrors({
        ...errors,
        emailErrors: t("forgetPassErr1"),
      });
      console.log("Error: ", error);
    }
  }
  async function handleToken() {
    try {
      const res = await axiosInstanceParking.post("/users/me/validate-otp", {
        token,
        email,
      });
      setCodeconfirmed(true);
      setShowEmailModal(false);
    } catch (error) {
      if (error.response) {
        setErrors({
          ...errors,
          tokenErrors: t("forgetPassErr2"),
        });
        console.log("Error data:", error.response.data);
        // toast.error("رمز التحقق غير صحيح");
      }
    }
  }

  async function handleResetPassword() {
    try {
      const res = await axiosInstanceParking.post("/users/me/reset-password", {
        token,
        email,
        password,
        confirmPassword,
      });
      setEsc(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      toast.success(t("forgetPassSccess1"));
    } catch (error) {
      if (error.response) {
        toast.error(t("forgetPassErr3"));
        //console.log("Error data:", error.response.data);
      } else if (error.request) {
        toast.error(t("forgetPassErr3"));

        //console.log("No response received from server:", error.request);
      } else {
        toast.error(t("forgetPassErr3"));

        //console.log("Error while setting up request:", error.message);
      }
    }
  }
  const language = useSelector((state) => state.language.language);

  return (
    <>
      {showEmailModal && (
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
              <div className="modal-body  p-0 px-4">
                <div className=" d-flex ">
                  <div className="d-flex flex-column  ">
                    <label className=" pt-2">{t("forgetPass3")}</label>
                    <input
                      type="email"
                      name="email"
                      className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                      value={email}
                      onChange={registeValidation}
                      onBlur={registeValidation}
                    />
                    <p
                      className={`${classes.error} text-danger`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {errors.emailErrors}
                    </p>
                  </div>
                  <div className="text-start align-self-center">
                    <img
                      style={{ height: "100%", width: "6rem" }}
                      src="/images/notify-animate.svg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="modal-footer p-0 m-0 d-flex justify-content-start">
                  <input
                    type="submit"
                    value={t("search")}
                    onClick={() => {
                      handleForgotPassword();
                    }}
                    data-bs-toggle={enterOtp ? "modal" : ""}
                    data-bs-target={enterOtp ? "#exampleModalToggle2" : ""}
                    className={"text-center bgColor text-white btn"}
                    // disabled={email.trim() === ""} // Add disabled attribute based on email state
                    disabled={Object.values(errors.emailErrors).some(
                      (userEmail) => userEmail !== ""
                    )}
                  />
                  <button
                    type="button"
                    className="text-center  bgColor text-white btn"
                    data-bs-dismiss="modal"
                  >
                    {t("cancelProcess")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {enterOtp? ():()} */}
      {enterOtp && (
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
              <div className="modal-body p-0">
                <div className="d-flex">
                  <div
                    className={`${
                      language == "ar" ? "text-end" : "text-start"
                    } px-3 align-self-center `}
                  >
                    <label className=" pt-2">{t("verificationCode")}</label>
                    <input
                      type="text"
                      name="otp"
                      value={token}
                      onChange={registeValidation}
                      onBlur={registeValidation}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData("text");
                        setToken(pastedText);
                      }}
                      className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                    />
                    <p
                      className={`${classes.error} text-danger `}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {errors.tokenErrors}
                    </p>
                  </div>
                  <div className="  text-start align-self-center">
                    <img
                      style={{ height: "30%", width: "50%" }}
                      src="/images/emails-animate (1).svg"
                      alt=""
                    />
                  </div>
                </div>

                <p align="justify" className="fs-6  px-4 text-justify-center">
                  {t("forgetPass4")}
                  <span className={`${classes.resendcode} mx-1`}>{email}</span>
                  {t("forgetPass5")}
                </p>
                <div className="modal-footer p-0 px-3 m-0 justify-content-start">
                  <input
                    type="submit"
                    value={t("send")}
                    onClick={() => {
                      handleToken();
                    }}
                    data-bs-toggle={codeconfirmed ? "modal" : ""}
                    data-bs-target={codeconfirmed ? "#staticBackdrop" : ""}
                    className="text-center bgColor text-white btn"
                    disabled={Object.values(errors.tokenErrors).some(
                      (token) => token !== ""
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {codeconfirmed && (
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
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
              <div className="modal-body p-0">
                <div className="d-flex">
                  <div>
                    <div className="text-end pe-3 align-self-center ">
                      <label className=" pb-2">{t("forgetPass6")}</label>

                      <div className="input-group">
                        <div className="d-flex  w-100 justify-content-end">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                              registeValidation;
                              setPassword(e.target.value);
                            }}
                            className={`${classes.input} form-control border-secondary shadow-none`}
                            style={{
                              borderTopRightRadius: "0.375rem",
                              borderBottomRightRadius: "0.375rem",
                            }}
                            onBlur={registeValidation}
                          />
                          <button
                            type="button"
                            className="btn Gray border-0"
                            style={{ position: "absolute", zIndex: "1" }}
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <IoEyeOutline />
                            ) : (
                              <FaRegEyeSlash />
                            )}
                          </button>
                        </div>
                      </div>
                      <p
                        className={`${classes.error} text-danger`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {errors.passwordErrors}
                      </p>
                    </div>
                    <div className="text-end pe-3 align-self-center ">
                      <label className=" pb-2">{t("confirmPassword")}</label>

                      <div className="input-group">
                        <div className="d-flex  w-100 justify-content-end">
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                              registeValidation;
                              setConfirmPassword(e.target.value);
                            }}
                            className={`${classes.input} form-control border-secondary shadow-none`}
                            style={{
                              borderTopRightRadius: "0.375rem",
                              borderBottomRightRadius: "0.375rem",
                            }}
                            onBlur={registeValidation}
                          />
                          <button
                            type="button"
                            className="btn Gray border-0"
                            style={{ position: "absolute", zIndex: "1" }}
                            onClick={togglePasswordVisibility}
                          ></button>
                        </div>
                      </div>
                      <p className={`${classes.error} text-danger fs-6`}>
                        {errors.confirmPasswordErrors}
                      </p>
                    </div>
                  </div>

                  <div className="  text-start align-self-center"></div>
                  <div className="  text-center align-self-center">
                    <img
                      style={{ height: "30%", width: "50%" }}
                      src="/images/account-animate.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-footer p-0 px-3 m-0 justify-content-start">
                  <input
                    type="submit"
                    value={t("send")}
                    onClick={handleResetPassword}
                    className="text-center bgColor text-white btn"
                    data-bs-dismiss={esc ? "modal" : ""}
                    disabled={Object.values(
                      errors.passwordErrors || errors.confirmPasswordErrors
                    ).some((password) => password !== "")}
                  />
                  <button
                    type="button"
                    className="text-center  bgColor text-white btn"
                    data-bs-dismiss="modal"
                  >
                    {t("cancelProcess")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
};

export default ForgotPassword;
