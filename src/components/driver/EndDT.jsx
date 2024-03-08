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

export default function EndDateTime({ BookNow, onReserveChange, setIsSearch }) {
  const token = useSelector((state) => state.loggedIn.token);
  console.log(token);
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
  };

  const calculateTimeDifference = () => {
    const startTime = new Date(searchData.from).getTime();
    const endTime = new Date(searchData.to).getTime();

    console.log(startTime);
    console.log(endTime);

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
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

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

    axiosInstanceParking
      .get(`/parkings/?city=${searchData.city}&from=${searchData.from}&to=${searchData.to}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        onReserveChange(response.data.parks);
        console.log("Response:", response.data.parks);
        setIsSearch(true);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <>
      <form method="post" onSubmit={sendQuery}>
        <div className={`${classes.customSelectWrapper} Gray container  text-center w-100 mx-2 mb-2  `}>
          <select
            id="cars"
            name="city"
            className={`w-100  focus border border-0 rounded-2  p-1  pointer shadow-none customRange Gray `}
            onChange={handleInputChange}
            value={searchData.city}
          >
            <option value="" hidden className="text-danger">
              اختر الولاية
            </option>
            <option value="مسقط">مسقط</option>
            <option value="مطرح">مطرح</option>
            <option value="السيب">السيب</option>
            <option value="بوشر">بوشر</option>
            <option value="العامرات">العامرات</option>
            <option value="قريات">قريات</option>
          </select>
        </div>
        <div className="container">
          <div className={BookNow ? "  d-none text-end  " : " text-end "}>
            <label className="Gray pe-2 ">بداية من :</label>

            <input
              icon={<FcOvertime />}
              className=" customRange  focus Gray border-0 pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
              type="datetime-local"
              name="from"
              value={searchData.from}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-end ">
            <label className="Gray pe-2">{BookNow ? "موعد نهاية الحجز :" : "إلي :"}</label>
            <input
              className=" customRange  Gray focus border border-0 pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
              type="datetime-local"
              name="to"
              value={searchData.to}
              onChange={handleInputChange}
            />
          </div>
          <div
            onClick={calculateTimeDifference}
            className=" customRange mt-4 Gray  border border-0 pointer text-center w-100 m-2 ms-3 p-1 fw-semibold animate  rounded-2"
          >
            {timeDifference.minutes > 0 || timeDifference.hours > 0 || timeDifference.days > 0
              ? ` ${timeDifference.days} يوم, ${timeDifference.hours}  ساعة, ${timeDifference.minutes} دقيقة`
              : " معرفة مدة الركن "}
          </div>
          <div className={`text-end`}>
            <button type="submit" className={`text-center bgColor text-white btn m-2 mx-3 ${classes.formBtn} `}>
              اعرض المواقف
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}
