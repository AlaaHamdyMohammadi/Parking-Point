/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import classes from "./../../styles/register.module.css";

const { useState } = React;
import { FcOvertime } from "react-icons/fc";

export default function EndDateTime({ BookNow, onReserveChange, setIsSearch }) {
  function handleSearch() {
    setIsSearch(true);
  }
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  // From: BookNow ? Date.now() : "",
  const [searchData, setSearchData] = useState({
    time: {
      from: BookNow ? new Date().toISOString().slice(0, 16) : "", // Format: "YYYY-MM-DDTHH:mm"
      to: "",
    },
    city: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the time object based on the input name
    setSearchData({
      ...searchData,
      time: {
        ...searchData.time,
        [name]: value,
      },
    });

    // Call calculateTimeDifference whenever from or to inputs change
    if (name === "from" || name === "to") {
      calculateTimeDifference();
    }
  };

  // if (name === "From" || name === "To") {
  //   calculateTimeDifference();
  // }
  const calculateTimeDifference = () => {
    const startTime = new Date(searchData.time.from).getTime();
    const endTime = new Date(searchData.time.to).getTime();

    if (isNaN(startTime) || isNaN(endTime)) {
      alert("Please enter valid start and end dates.");
      return;
    }

    if (startTime >= endTime) {
      alert("End date and time must be after start date and time.");
      return;
    }

    const timeDifference = Math.abs(endTime - startTime);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    console.log(startTime);
    console.log(endTime);

    setTimeDifference({ hours, minutes, days });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onReserveChange(searchData);
    console.log(searchData);
  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className={`${classes.customSelectWrapper} Gray container  text-center w-100 mx-2 mb-2  `}>
          <select
            id="cars"
            name="city"
            className={`w-100 border border-0 rounded-2  p-1  pointer shadow-none customRange Gray `}
            onChange={handleInputChange}
            value={searchData.city}
          >
            <option value="" hidden className="text-danger">
              اختر الولاية
            </option>
            <option value="masqt">مسقط</option>
            <option value="mtrh">مطرح</option>
            <option value="seeb">السيب</option>
            <option value="boshr">بوشر</option>
            <option value="amrat">العامرات</option>
            <option value="qryat">قريات</option>
          </select>
        </div>
        <div className="container">
          <div className={BookNow ? "  d-none text-end  " : " text-end "}>
            <label className="Gray pe-2 ">بداية من :</label>

            <input
              icon={<FcOvertime />}
              className=" customRange  Gray border-0 pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
              type="datetime-local"
              name="from"
              value={searchData.time.from}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-end ">
            <label className="Gray pe-2">{BookNow ? "موعد نهاية الحجز :" : "إلي :"}</label>
            <input
              className=" customRange  Gray  border border-0 pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
              type="datetime-local"
              name="to"
              value={searchData.time.to}
              onChange={handleInputChange}
            />
          </div>
          <button
            onClick={calculateTimeDifference}
            className=" customRange mt-4 Gray border border-0 pointer text-center w-100 m-2 ms-3 p-1 fw-semibold animate  rounded-2"
          >
            {`${timeDifference.days} يوم, ${timeDifference.hours}  ساعة, ${timeDifference.minutes} دقيقة`}
          </button>
          <div className={`text-end`}>
            {/* {timeDifference.minutes > 10 && ( */}
            <button
              type="submit"
              className={`text-center bgColor text-white btn m-2 mx-3 ${classes.formBtn} `}
              onClick={handleSearch}
            >
              اعرض المواقف
            </button>
            {/* )} */}
          </div>
        </div>
      </form>
    </>
  );
}
