/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { forwardRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import { FcOvertime } from "react-icons/fc";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

import DatePicker from "react-datepicker";
export default function RangeDate() {
  const [dateRange, setDateRange] = useState([null, null]);

  // const [dateRange, setDateRange] = useState([setHours(setMinutes(new Date(), 30), 17), null]);
  const [startDate, endDate] = dateRange;

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className=" customRange border Gray pointer text-center w-75 m-2 p-1  rounded-2" onClick={onClick} ref={ref}>
      <FcOvertime className="fs-3 px-1" />
      {value ? value : "بداية من : إالى"}
    </div>
  ));
  return (
    <>
      <DatePicker
        showTimeSelect
        minTime={setHours(setMinutes(new Date(), 0), 17)}
        maxTime={setHours(setMinutes(new Date(), 30), 20)}
        dateFormat="MMMM d, yyyy h:mm aa"
        //
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        customInput={<ExampleCustomInput />}
        onChange={(update) => {
          setDateRange(update);
        }}
        minDate={subDays(new Date(), 0)}
        placeholderText="Selct a date after 5 days ago"
        maxDate={addDays(new Date(), 30)}
        withPortal
      />
    </>
  );
}
