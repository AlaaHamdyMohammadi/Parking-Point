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
const ForgotPassword = () => {
  const [registeUser, setRegisteUser] = React.useState({ email: "" });
  const [codeconfirmed, setCodeconfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [esc, setEsc] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = useState(false);

  const [errors, setErrors] = React.useState({
    passwordErrors: "*",
    confirmPasswordErrors: "*",
    tokenErrors: "*",
  });

  // useEffect(() => {
  //   console.log("enterOtp:", enterOtp);
  //   // handleForgotPassword();
  // }, [showEmailModal, enterOtp, esc, confirmPassword]);

  let passwordRegx = /^[a-zA-Z0-9]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const registeValidation = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setErrors({
        ...errors,
        passwordErrors:
          value.length === 0
            ? "يجب ادخال رقم سري"
            : value.length <= 7
            ? "يحب ادخال 8 احرف بحد ادني"
            : passwordRegx.test(value)
            ? ""
            : "يجب ادخال حرف كبير وحرف صغير ورقم بحد ادني",
      });
    }
    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPasswordErrors:
          value.length === 0
            ? "يجب تاكيد الرقم السري"
            : value == registeUser.password
            ? ""
            : "الرقم غير صحيح",
      });
    }
    setRegisteUser({ ...registeUser, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleForgotPassword() {
    if (!emailRegex.test(email)) {
      setEmailError(true);
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
    } else {
      try {
        const res = await axiosInstanceParking.post(
          "/users/me/forget-password",
          {
            email,
          }
        );
        console.log(res.data);
        setEnterOtp(true);
        // setEnterOtp((prevState) => !prevState);
        // setEnterOtp((prevState) => {
        //   //console.log("prevState:", prevState);
        //   return !prevState;
        // });
        console.log(enterOtp);
      } catch (error) {
        toast.error("لا يوجد حساب مسجل علي هذا البريد الالكتروني");

        console.log("Error: ", error);
      }
    }
  }
  //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>.");
  console.log(enterOtp);

  //console.log("enterOtp", enterOtp); //
  //console.log("showEmailModal", showEmailModal);
  //console.log("confirmPassword", confirmPassword);
  async function handleToken() {
    try {
      // console.log("Token before API call:", token);

      const res = await axiosInstanceParking.post("/users/me/validate-otp", {
        token,
        email,
      });
      setCodeconfirmed(true);
      // setShowEmailModal(false);
      setEnterOtp(false);
      //console.log(res, "handletoken SUCCESS");
      // console.log(
      //   codeconfirmed,
      //   "codeconfirmed",
      //   showEmailModal,
      //   "ShowEmailModal"
      // );
    } catch (error) {
      if (error.response) {
        console.log("Error data:", error.response.data);
        toast.error("رمز التحقق غير صحيح");
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
      //console.log(res);
      setCodeconfirmed(false);
      setEsc(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      toast.success("تم تفعيل كلمة السر بنجاح");
    } catch (error) {
      if (error.response) {
        //console.log("Error data:", error.response.data);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Error while setting up request:", error.message);
      }
    }
  }

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
                    <label className=" pt-2">
                      الرجاء إدخال عنوان بريدك الإلكتروني للبحث عن حسابك:
                    </label>
                    <input
                      type="email"
                      className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                        //console.log("Email:", e.target.value);
                      }}
                    />
                    {emailError && (
                      <p className="text-danger">
                        يرجى إدخال عنوان بريد إلكتروني
                      </p>
                    )}
                  </div>
                  <div className="text-start align-self-center">
                    <img
                      style={{ height: "100%", width: "10rem" }}
                      src="/images/notify-animate.svg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="modal-footer p-0 m-0 d-flex justify-content-start">
                  <input
                    type="submit"
                    value="بحث"
                    onClick={() => {
                      if (email.trim() === "") {
                        setEmailError(true);
                      } else {
                        handleForgotPassword();
                      }
                    }}
                    data-bs-toggle={enterOtp ? "modal" : ""}
                    data-bs-target={enterOtp ? "#exampleModalToggle2" : ""}
                    className={"text-center bgColor text-white btn"}
                    disabled={email.trim() === ""}
                  />
                  <button
                    type="button"
                    className="text-center  bgColor text-white btn"
                    data-bs-dismiss="modal"
                  >
                    إلغاء
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
                  <div className="text-end pe-3 align-self-center ">
                    <label className=" pt-2">رمز التحقق:</label>

                    <input
                      type="text"
                      value={token}
                      onChange={(e) => {
                        setToken(e.target.value);
                        //console.log("Token:", e.target.value);
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData("text");
                        setToken(pastedText);
                        //console.log("Pasted Token:", pastedText);
                      }}
                      className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                    />
                    {/* <ConfirmationCodeInput length={6} onConfirm={(code) => console.log("Confirmed:", code)} /> */}
                  </div>
                  <div className="  text-start align-self-center">
                    <img
                      style={{ height: "30%", width: "60%" }}
                      src="/images/emails-animate (1).svg"
                      alt=""
                    />
                  </div>
                </div>

                <p className="fs-6  px-4 text-justify-center">
                  لقد تم إرسال رمز التحقق إلى عنوان بريدك الإلكتروني المُسجّل
                  <span className={`${classes.resendcode}`}>
                    {registeUser.email}
                  </span>
                  يُرجى فتح بريدك الإلكتروني و نسخ الرمز المُرسل.
                </p>
                <div className="modal-footer p-0 px-3 m-0 justify-content-start">
                  <input
                    type="submit"
                    value="تأكيد"
                    onClick={() => {
                      handleToken();
                    }}
                    data-bs-toggle={codeconfirmed ? "modal" : ""}
                    data-bs-target={codeconfirmed ? "#staticBackdrop" : ""}
                    className="text-center bgColor text-white btn"
                  />
                  <button
                    className="text-center  bgColor text-white btn"
                    data-bs-target="#staticBackdrop"
                    data-bs-toggle="modal"
                    onClick={() => {
                      setShowEmailModal(true);
                    }}
                  >
                    الرجوع
                  </button>
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
                      <label className=" pb-2">كلمة السر الجديده:</label>

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
                              //console.log("Password:", e.target.value);
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
                            className="btn Gray border border-0"
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
                      <p className={`${classes.error} text-danger`}>
                        {errors.passwordErrors}
                      </p>
                    </div>
                    <div className="text-end pe-3 align-self-center ">
                      <label className=" pb-2">تأكيد كلمة السر:</label>

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
                              //console.log("ConfirmPassword:", e.target.value);
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
                            className="btn Gray border border-0"
                            style={{ position: "absolute", zIndex: "1" }}
                            onClick={togglePasswordVisibility}
                          ></button>
                        </div>
                      </div>
                      <p className={`${classes.error} text-danger`}>
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
                    value="تأكيد"
                    onClick={handleResetPassword}
                    className="text-center bgColor text-white btn"
                    data-bs-dismiss={esc ? "modal" : ""}
                  />
                  <button
                    type="button"
                    className="text-center  bgColor text-white btn"
                    data-bs-dismiss="modal"
                  >
                    إلغاء
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
