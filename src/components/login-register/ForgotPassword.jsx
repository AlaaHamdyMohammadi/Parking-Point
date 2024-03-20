/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ConfirmationCodeInput from "./confirmEmail";
import classes from "./../../styles/formStyles.module.css";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
const ForgotPassword = () => {
  const [registeUser, setRegisteUser] = React.useState({ email: "" });
  const [codeconfirmed, setCodeconfirmed] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <div className="modal-body  p-0 px-4">
              <div className=" d-flex ">
                <div className="d-flex flex-column  ">
                  <label className=" pt-2">الرجاء إدخال عنوان بريدك الإلكتروني للبحث عن حسابك:</label>
                  <input
                    type="email"
                    className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                    value={registeUser.email}
                    onChange={(e) => setRegisteUser({ ...registeUser, email: e.target.value })}
                  />
                </div>
                <div className="text-start align-self-center">
                  <img style={{ height: "100%", width: "10rem" }} src="./../../../public/images/notify-animate.svg" alt="" />
                </div>
              </div>

              <div className="modal-footer p-0 m-0 d-flex justify-content-between">
                <input
                  type="submit"
                  value="بحث"
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
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {!codeconfirmed ? (
              <div className="modal-body p-0">
                <div className="d-flex">
                  <div className="text-end pe-3 align-self-center ">
                    <label className=" pt-2">رمز التحقق:</label>

                    <input
                      type="text"
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
                  {/* <div className="  text-center align-self-center">
   <img style={{ height: "30%", width: "40%" }} src="./../../../public/images/emails-animate (1).svg" alt="" />
 </div>
 <div className="text-center  align-self-center ">
   <ConfirmationCodeInput length={6} onConfirm={(code) => console.log("Confirmed:", code)} />
 </div> */}
                </div>

                <p className="fs-6  px-4 text-justify-center">
                  لقد تم إرسال رمز التحقق إلى عنوان بريدك الإلكتروني المُسجّل
                  <span className={`${classes.resendcode}`}>{registeUser.email}</span> يُرجى فتح بريدك الإلكتروني و نسخ الرمز
                  المُرسل.
                </p>
              </div>
            ) : (
              <div className="modal-body p-0">
                <div className="d-flex">
                  <div className="text-end pe-3 align-self-center ">
                    <label className=" pb-2">كلمة السر الجديده:</label>

                    <div className="input-group">
                      <div className="d-flex  w-100 justify-content-end">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          className={`${classes.input} form-control border-secondary shadow-none`}
                          style={{ borderTopRightRadius: "0.375rem", borderBottomRightRadius: "0.375rem" }}
                        />
                        <button
                          type="button"
                          className="btn Gray border border-0"
                          style={{ position: "absolute", zIndex: "1" }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="  text-start align-self-center"></div>
                  <div className="  text-center align-self-center">
                    <img style={{ height: "30%", width: "50%" }} src="./../../../public/images/account-animate.svg" alt="" />
                  </div>
                </div>
              </div>
            )}

            <div className="modal-footer p-0 pe-3 m-0 justify-content-between">
              <input
                type="submit"
                value="تأكيد"
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
    </>
  );
};

export default ForgotPassword;
