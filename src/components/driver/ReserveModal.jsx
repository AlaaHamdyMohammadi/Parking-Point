import React, { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import useLogInUserData from "../../../hook/useLogInUserData";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";

export default function ModalReserve({ReserveTime}) {
  const user = useLogInUserData();
  const token = useSelector((state) => state.loggedIn.token);
  const [registeUser, setRegisteUser] = useState({
    plateNumber: "",
  });
  const [errors, setErrors] = useState({
    plateNumberErrors: "",
  });
  let plateNumberRegx = /^[0-9]{5,}$/;

  const registeValidation = (event) => {
    const { name, value } = event.target;

    if (name === "plateNumber") {
      setErrors({
        ...errors,
        plateNumberErrors:
          value.length === 0 ? "يجب ادخال رقم لوحة السيارة" : plateNumberRegx.test(value) ? "" : "يجب ادخال رقم لوحة صحيح",
      });
    }
    setRegisteUser({ ...registeUser, [name]: value });
  };


const handlePayment = async () => {
  try {
    const response = await axiosInstanceParking.post(
      `/reserve?from=${ReserveTime.from}&to=${ReserveTime.to}&plateNumber=${user.plateNumber}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error occurred while payment:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
};

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
              <h5 className="modal-title pe-2" id="exampleModalToggleLabel"></h5>
              <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body  p-2">
              <div className="">
                <label className="fw-semibold pb-2" htmlFor="plateNumber">
                  يجب تاكيد رقم اللوحة الخاصه بسيارة الركن
                </label>
                <input
                  type="text"
                  id="plateNumber"
                  value={user.plateNumber}
                  name="plateNumber"
                  className={`${classes.input} px-2  form-control border-secondary shadow-none`}
                  onChange={registeValidation}
                  onBlur={registeValidation}
                />
                <p className={`${classes.error} text-danger`}>{errors.plateNumberErrors}</p>
              </div>
            </div>
            <div className="modal-footer p-0">
              <button 
              onClick={handlePayment}
               className="btn bgColor text-white " data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
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
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                تأكيد الدفع
              </h1>
            </div>
            <div className="modal-body">Hide this modal and show the first with the button below.</div>
            <div className="modal-footer">
              <button className="btn  bgColor text-white" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                الرجوع{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className=" bgColor text-white w-100   p-0  btn " data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
        احجز{" "}
      </button>
    </>
  );
}
