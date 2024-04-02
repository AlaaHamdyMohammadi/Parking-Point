import React, { useState } from 'react';
import classes from "./../../../styles/formStyles.module.css";


const ShowEmailPassModal = ({handleForgotPassword ,setEmail,email,showEmailModal,codeconfirmed,setPassword,setConfirmPassword ,esc,
    exampleModalToggle2
    ,togglePasswordVisibility}) => {
    const [emailError, setEmailError] = useState(false);
    // const [email, setEmail] = React.useState("");
    const [enterOtp, setEnterOtp] = useState(false);

    return (
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
            {showEmailModal && ( <div className="modal-body  p-0 px-4">
              <div className=" d-flex ">
                <div className="d-flex flex-column  ">
                  <label className=" pt-2">الرجاء إدخال عنوان بريدك الإلكتروني للبحث عن حسابك:</label>
                  <input
                    type="email"
                    className={`${classes.input}  w-100 mt-2 form-control border-secondary shadow-none`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                      console.log("Email:", e.target.value);
                    }}
                  />
                  {emailError && (
                    <p className="text-danger">
                      يرجى إدخال عنوان بريد إلكتروني
                    </p>
                  )}
                </div>
                <div className="text-start align-self-center">
                  <img style={{ height: "100%", width: "10rem" }} src="./../../../public/images/notify-animate.svg" alt="" />
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
                  data-bs-toggle={enterOtp ? `${modal}` : ``}
                  data-bs-target={enterOtp ?`#${exampleModalToggle2}` : ``}
                  className={"text-center bgColor text-white btn"}
                  disabled={email.trim() === ""}
                />
    <button type="button" className="text-center  bgColor text-white btn"
  data-bs-dismiss="modal">إلغاء</button>
              </div>
            </div>) }
{codeconfirmed && (<div className="modal-body p-0">
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
                              console.log("Password:", e.target.value);
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
                            {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                          </button>
                        </div>
                      </div>
                      <p className={`${classes.error} text-danger`}>{errors.passwordErrors}</p>
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
                              console.log("ConfirmPassword:", e.target.value);
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
                          </button>
                        </div>
                      </div>
                      <p className={`${classes.error} text-danger`}>{errors.confirmPasswordErrors}</p>
                    </div>
                  </div>

                  <div className="  text-start align-self-center"></div>
                  <div className="  text-center align-self-center">
                    <img style={{ height: "30%", width: "50%" }} src="./../../../public/images/account-animate.svg" alt="" />
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
 <button type="button" className="text-center  bgColor text-white btn"
  data-bs-dismiss="modal">إلغاء</button>

                </div>
              </div>)}
            

           
          </div>
        </div>
      </div>
    );
}

export default ShowEmailPassModal;
