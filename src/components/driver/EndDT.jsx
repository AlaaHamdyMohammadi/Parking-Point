/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import classes from "./../../styles/register.module.css";

const { useState } = React;
import { FcOvertime } from "react-icons/fc";
import axiosInstanceParking from "../../axiosConfig/instanc";

export default function EndDateTime({ BookNow, onReserveChange, setIsSearch }) {
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
    if (name === "city") {
      setSearchData({
        ...searchData,
        [name]: value,
      });
    } else {
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        time: {
          ...prevSearchData.time,
          [name]: value,
        },
      }));
      calculateTimeDifference();
    }
  };

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

    setTimeDifference({ hours, minutes, days });
  };

  const sendQuery = (e) => {
    e.preventDefault();
    // setIsSearch(true);
    console.log("ttttttttttttttttttttttttttttttttttt");
    console.log(searchData);

    axiosInstanceParking
      .get("parkings", searchData)
      .then((response) => {
        console.log("Responsessssssssssssssssssssssssssssssssss:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error:rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          error
        );
      });
  };

  return (
    <>
      <form method="post" onSubmit={sendQuery}>
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
          <div
            // onClick={calculateTimeDifference}
            className=" customRange mt-4 Gray border border-0 pointer text-center w-100 m-2 ms-3 p-1 fw-semibold animate  rounded-2"
          >
            {`${timeDifference.days} يوم, ${timeDifference.hours}  ساعة, ${timeDifference.minutes} دقيقة`}
          </div>
          <div className={`text-end`}>
            <button type="submit" className={`text-center bgColor text-white btn m-2 mx-3 ${classes.formBtn} `}>
              اعرض المواقف
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
