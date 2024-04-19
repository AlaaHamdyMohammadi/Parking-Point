/* eslint-disable react/prop-types */

import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import useLogInUserData from "../../../hook/useLogInUserData";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ModalReserve({ ReserveTime, ParkId }) {
  const user = useLogInUserData();
  const token = useSelector((state) => state.loggedIn.token);
  const [registeUser, setRegisteUser] = useState({
    plateNumber: user.plateNumber, // Set default value to user's plateNumber
  });
  const [errors, setErrors] = useState({
    plateNumberErrors: "",
  });
  let plateNumberRegx = /^[0-9]{1,5}[a-z]{1,2}$/;

  const registeValidation = (event) => {
    const { name, value } = event.target;

    if (name === "plateNumber") {
      setErrors({
        ...errors,
        plateNumberErrors:
          value.length === 0
            ? "يجب ادخال رقم لوحة السيارة"
            : plateNumberRegx.test(value)
            ? ""
            : "يجب ادخال رقم لوحة صحيح",
      });
      setRegisteUser({ ...registeUser, [name]: value }); // Update the plateNumber state
    }
  };

  const handlePayment = async () => {
    // console.log("ReserveTime", ReserveTime);
    try {
      console.log("ReserveTime", ReserveTime);

      const response = await axiosInstanceParking.post(
        `/reserve`,
        {
          park: ParkId,
          from: ReserveTime.from,
          to: ReserveTime.to,
          plateNumber: registeUser.plateNumber, // Use updated plateNumber from state
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ReserveTime", ReserveTime);
      const sessionID = response.data.sessionId;
      localStorage.setItem("sessionID", sessionID);
      window.location.href = `https://uatcheckout.thawani.om/pay/${sessionID}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`;
    } catch (error) {
      console.error("Error occurred while payment:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    setRegisteUser({ ...registeUser, plateNumber: user.plateNumber });
  }, [user.plateNumber]); // Update the plateNumber when user's plateNumber changes

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header p-1 m-0 ">
              <h5
                className="modal-title pe-2"
                id="exampleModalToggleLabel"
              ></h5>
              <button
                type="button"
                className="btn-close m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-2">
              <div className="">
                <label className="fw-semibold pb-2" htmlFor="plateNumber">
                  يجب تاكيد رقم اللوحة الخاصه بسيارة الركن
                </label>
                <input
                  type="text"
                  id="plateNumber"
                  value={registeUser.plateNumber} // Bind to registeUser.plateNumber state
                  name="plateNumber"
                  className={`${classes.input} px-2 form-control border-secondary shadow-none`}
                  onChange={registeValidation}
                />
                <p className={`${classes.error} text-danger`}>
                  {errors.plateNumberErrors}
                </p>
              </div>
            </div>
            <div className="modal-footer p-0">
              <button
                onClick={handlePayment}
                className="btn bgColor text-white"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                تأكيد
              </button>
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
      ></div>
      <button
        className="bgColor text-white w-100 p-0 btn"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        احجز
      </button>
    </>
  );
}
