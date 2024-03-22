/* eslint-disable no-unused-vars */
import React from "react";
import classes from "./../../../styles/formStyles.module.css";
import axiosInstanceParking from "../../../axiosConfig/instanc";

const ForgotPasswordModal = () => {
  const [email, setEmail] = React.useState("");
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
  );
};

export default ForgotPasswordModal;
