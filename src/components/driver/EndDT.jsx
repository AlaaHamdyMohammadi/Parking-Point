/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

const { useState } = React;
import { FcOvertime } from "react-icons/fc";

export default function EndDateTime() {
  //   const [startTime, setStartTime] = useState();
  const [dateInputs, setDateInputs] = useState({
    startDate: "",
    endDate: "",
  });

  const [timeDifference, setTimeDifference] = useState({
    hours: 0,
    minutes: 0,
  });

  const calculateTimeDifference = () => {
    // setStartTime(new Date(dateInputs.startDate).getTime());

    const startTime = new Date(dateInputs.startDate).getTime();
    const endTime = new Date(dateInputs.endDate).getTime();

    if (isNaN(startTime) || isNaN(endTime)) {
      alert("Please enter valid start and end dates.");
      return;
    }

    if (startTime >= endTime) {
      alert("End date and time must be after start date and time.");
      return;
    }

    const timeDifference = Math.abs(endTime - startTime);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    console.log(startTime);

    setTimeDifference({ hours, minutes });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDateInputs({
      ...dateInputs,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div>
        <label className="Gray">بداية من :</label>

        <input
          icon={<FcOvertime />}
          className=" customRange  Gray border pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
          type="datetime-local"
          name="startDate"
          value={dateInputs.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="Gray">إلي :</label>
        <input
          className=" customRange  Gray border pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
          type="datetime-local"
          name="endDate"
          value={dateInputs.endDate}
          onChange={handleInputChange}
        />
      </div>
      <button
        className=" customRange  Gray border pointer text-center w-100 m-2 ms-3 p-1  rounded-2"
        onClick={calculateTimeDifference}
      >
        {timeDifference.hours > 0 ? `${timeDifference.hours}  ساعة, ${timeDifference.minutes} دقيقة` : " معرفة مدة الركن "}
      </button>
    </div>
  );
}
