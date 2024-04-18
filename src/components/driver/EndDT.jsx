/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import classes from "./../../styles/register.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { useState } = React;
import { FcOvertime } from "react-icons/fc";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import useSendCode from "../../../hook/useSendCode";
import ConfimEmailPop from "../login-register/confirmEmailpop";
import useLogInUserData from "../../../hook/useLogInUserData";

export default function EndDateTime({
  BookNow,
  onReserveChange,
  setIsSearch,
  onTimeChange,
}) {
  const user = useLogInUserData();
  const token = useSelector((state) => state.loggedIn.token);
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [searchData, setSearchData] = useState({
    city: "",

    from: BookNow ? new Date().toISOString().slice(0, 16) : null,
    to: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedData = { ...searchData };
    if (name === "from" || name === "to") {
      updatedData[name] = value;
    } else {
      updatedData[name] = value;
    }

    setSearchData(updatedData);
    onTimeChange(updatedData);
  };

  const calculateTimeDifference = () => {
    const startTime = new Date(searchData.from).getTime();
    const endTime = new Date(searchData.to).getTime();

    // console.log(startTime);
    // console.log(endTime);

    // if (isNaN(startTime) || isNaN(endTime)) {
    //   toast.error("يجب ادخال تاريخ الحجز");
    //   return;
    // }

    if (startTime >= endTime) {
      toast.error("يجب أن يكون تاريخ انتهاء الحجز  بعد تاريخ البدء.");
      return;
    }

    const timeDifference = Math.abs(endTime - startTime);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    setTimeDifference({ hours, minutes, days });
  };

  const sendQuery = (e) => {
    e.preventDefault();
    console.log(searchData);
    const startTime = new Date(searchData.from).getTime();
    const endTime = new Date(searchData.to).getTime();
    if (startTime >= endTime) {
      toast.error("يجب أن يكون تاريخ انتهاء الحجز  بعد تاريخ البدء.");
      return;
    }
    if (user.isEmailConfirmed == false) {
      e.preventDefault();
    } else {
      axiosInstanceParking
        .get(
          `/parkings/?city=${searchData.city}&from=${searchData.from}&to=${searchData.to}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          onReserveChange(response.data.parks);
          console.log("Response:", response.data.parks);
          setIsSearch(true);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };
  const handleChange = useSendCode();
  return (
    <>
      <form method="post" onSubmit={sendQuery}>
        <div className="container">
          <div
            className={`${classes.customSelectWrapper} Gray   text-center w-100  mb-2  `}
          >
            <select
              id="cars"
              name="city"
              className={`w-100 Gray focus border border-0 rounded-2  p-1  pointer shadow-none customRange  `}
              onChange={handleInputChange}
              value={searchData.city}
            >
              <option value="" hidden className="text-danger">
                اختر الولاية
              </option>
              <option className="text-black" value="مسقط">
                مسقط
              </option>
              <option className="text-black" value="مطرح">
                مطرح
              </option>
              <option className="text-black" value="السيب">
                السيب
              </option>
              <option className="text-black" value="بوشر">
                بوشر
              </option>
              <option className="text-black" value="العامرات">
                العامرات
              </option>
              <option className="text-black" value="قريات">
                قريات
              </option>
            </select>
          </div>
          <div className={BookNow ? "  d-none text-end  " : " text-end "}>
            <label className=" p-2 ">بداية من :</label>
            {/* m-2 ms-3 p-1  */}
            <input
              icon={<FcOvertime />}
              className=" customRange Gray focus  border-0 pointer text-center w-100  p-2 rounded-2"
              type="datetime-local"
              name="from"
              value={searchData.from}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-end ">
            <label className=" p-2">
              {BookNow ? "موعد نهاية الحجز :" : "إلي :"}
            </label>
            <input
              className=" customRange Gray  focus border border-0 pointer text-center w-100  p-2  rounded-2"
              type="datetime-local"
              name="to"
              value={searchData.to}
              onChange={handleInputChange}
            />
          </div>
          <div
            onClick={calculateTimeDifference}
            className=" customRange mt-4  border-0 pointer text-center w-100 my- p-2 fw-semibold animate  rounded-2"
          >
            {timeDifference.minutes > 0 ||
            timeDifference.hours > 0 ||
            timeDifference.days > 0
              ? ` ${timeDifference.days} يوم, ${timeDifference.hours}  ساعة, ${timeDifference.minutes} دقيقة`
              : " معرفة مدة الركن "}
          </div>
          <div className={`text-end`}>
            <button
              type="submit"
              className={`text-center bgColor text-white btn  my-3 ${classes.formBtn}`}
              disabled={user.isEmailConfirmed == false && true}
            >
              اعرض المواقف
            </button>
            {user.isEmailConfirmed == false && (
              <div className="text-danger">
                <div>* للحجز يرجي تاكيد البريد الاليكتروني اولا</div>
                <div
                  className={`${classes.resendcode} pointer fs-6 fw-bold mt-md-1`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={handleChange}
                >
                  - اضغط هنا للتاكيد
                </div>
              </div>
            )}
            <ConfimEmailPop userEmail={user.email} />
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}
