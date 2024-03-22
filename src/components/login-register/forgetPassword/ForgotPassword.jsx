/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import classes from "./../../../styles/formStyles.module.css";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosInstanceParking from "../../../axiosConfig/instanc";
import ForgotPasswordModal from "./ForgotPasswordModal";

//{/*setRegisteUser({ ...registeUser, email: e.target.value })*/}

const ForgotPassword = () => {
  const [registeUser, setRegisteUser] = React.useState({ email: "" });
  const [codeconfirmed, setCodeconfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [errors, setErrors] = React.useState({
    emailErrors: "*",
    passwordErrors: "*",
    confirmPasswordErrors: "*",
  });
  let regionRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
  let passwordRegx = /^[a-zA-Z0-9]{8,}$/;
  let roleRegx = /^(renter|driver)$/;
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
    if (name === "role") {
      setErrors({
        ...errors,
        roleErrors:
          value.length === 0
            ? "يجب اختيار النوع"
            : roleRegx.test(value)
            ? ""
            : "يجب اختيار من واحد من الاختيارات المقدمة",
      });
    }
    if (registeUser.role === "renter") {
      if (name === "nationaleId") {
        setErrors({
          ...errors,
          nationaleIdErrors:
            value.length === 0
              ? "يجب ادخال رقم الهوية"
              : regionRegx.test(value)
              ? ""
              : "يجب ادخال ثلاثة احرف بحد ادني",
        });
      }
    }
    setRegisteUser({ ...registeUser, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleForgotPassword() {
    try {
      const res = await axiosInstanceParking.post("/users/me/forgetPassword", {
        email,
      });
      console.log(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function handleResetPassword() {
    try {
      const res = await axiosInstanceParking.post("/users/me/resetPassword", {
        token,
        email,
        password,
        confirmPassword,
      });
      console.log(res.data);
    } catch (error) {
      if (error.response) {
        console.log("Error data:", error.response.data);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Error while setting up request:", error.message);
      }
    }
  }

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
            <div className="modal-body  p-0 px-4">
              <div className=" d-flex ">
                <div className="d-flex flex-column  ">
                  <label className=" pt-2">
                    الرجاء إدخال عنوان بريدك الإلكتروني للبحث عن حسابك:
                  </label>
                  <input
                    type="email"
                    className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                    /*value={registeUser.email}*/
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-start align-self-center">
                  <img
                    style={{ height: "100%", width: "10rem" }}
                    src="./../../../public/images/notify-animate.svg"
                    alt=""
                  />
                </div>
              </div>

              <div className="modal-footer p-0 m-0 d-flex justify-content-between">
                <input
                  type="submit"
                  value="بحث"
                  onClick={handleForgotPassword}
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  className={
                    // Object.values(errors).some((error) => error !== "")
                    //   ? "btn bgColor text-white col-4 disabled"
                    // :
                    "text-center bgColor text-white btn  "
                  }
                  // disabled={Object.values(logInUser).some((logInUser) => logInUser == "")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!codeconfirmed ? (
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
                      onChange={(e) => setToken(e.target.value)}
                      className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                    />
                    {/* <ConfirmationCodeInput length={6} onConfirm={(code) => console.log("Confirmed:", code)} /> */}
                  </div>
                  <div className="  text-start align-self-center">
                    <img
                      style={{ height: "30%", width: "60%" }}
                      src="./../../../public/images/emails-animate (1).svg"
                      alt=""
                    />
                  </div>
                </div>

                <p className="fs-6  px-4 text-justify-center">
                  لقد تم إرسال رمز التحقق إلى عنوان بريدك الإلكتروني المُسجّل
                  <span className={`${classes.resendcode}`}>
                    {registeUser.email}
                  </span>{" "}
                  يُرجى فتح بريدك الإلكتروني و نسخ الرمز المُرسل.
                </p>
                <div className="modal-footer p-0 pe-3 m-0 justify-content-between">
                  <input
                    type="submit"
                    value="تأكيد"
                    onClick={() => setCodeconfirmed(true)}
                    className="text-center bgColor text-white btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                  <div>
                    <div className="text-end pe-3 align-self-center ">
                      <label className=" pb-2">كلمة السر الجديده:</label>

                      <div className="input-group">
                        <div className="d-flex  w-100 justify-content-end">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className={`${classes.input} form-control border-secondary shadow-none`}
                            style={{
                              borderTopRightRadius: "0.375rem",
                              borderBottomRightRadius: "0.375rem",
                            }}
                            onChange={registeValidation}
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
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            className={`${classes.input} form-control border-secondary shadow-none`}
                            style={{
                              borderTopRightRadius: "0.375rem",
                              borderBottomRightRadius: "0.375rem",
                            }}
                            onChange={registeValidation}
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
                        {errors.confirmPasswordErrors}
                      </p>
                    </div>
                  </div>

                  <div className="  text-start align-self-center"></div>
                  <div className="  text-center align-self-center">
                    <img
                      style={{ height: "30%", width: "50%" }}
                      src="./../../../public/images/account-animate.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-footer p-0 pe-3 m-0 justify-content-between">
                  <input
                    type="submit"
                    value="تأكيد"
                    onClick={handleResetPassword}
                    className="text-center bgColor text-white btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
