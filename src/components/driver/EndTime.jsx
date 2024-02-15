/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { forwardRef, useState } from "react";

import DatePicker from "react-datepicker";
import { FcOvertime } from "react-icons/fc";

export default function EndTime() {
  const [startDate, setStartDate] = useState(null);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className=" customRange  Gray border pointer text-center w-100 m-2 p-1  rounded-2" onClick={onClick} ref={ref}>
      <FcOvertime className="fs-3 px-1" />
      {value ? value : "  ادخل موعد نهاية الركن اليوم"}
    </div>
  ));
  return (
    <>
      <DatePicker
        customInput={<ExampleCustomInput />}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </>
  );
}
