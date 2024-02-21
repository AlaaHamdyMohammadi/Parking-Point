import React, { useState } from "react";
import EndDateTime from "./EndDT";
export default function SearchSec({ setIsSearch }) {
  const [reserveTime, setReserveTime] = useState(null);

  const handleReserveChange = (searchData) => {
    setReserveTime(searchData);
  };
  const [BookNow, setBookNow] = useState(true);
  function handelBookNow() {
    setBookNow(true);
  }
  function handelBookLater() {
    setBookNow(false);
  }
  console.log(reserveTime);

  return (
    <>
      <div className="d-flex mt-4 gap-4 ">
        <div
          onClick={handelBookNow}
          className={
            BookNow
              ? "   p-2 fw-bold fs-5  customborder pointer border-bottom border-3 "
              : "p-2 fw-bold pointer text-secondary text-opacity-50  border-0"
          }
        >
          {" "}
          احجز الآن
        </div>
        <div
          onClick={handelBookLater}
          className={
            !BookNow
              ? "   p-2 fw-bold fs-5  customborder border-bottom pointer border-3 "
              : "p-2 fw-bold pointer  text-secondary text-opacity-50 border-0"
          }
        >
          {" "}
          احجز لآحقا
        </div>
      </div>
      <div className={`card border-0  my-3`}>
        <div className={` shadow height text-center p-2 border-secondary-subtlepx-2 rounded-2 w-100 height`}>
          <div className={` fs-5 pe-4 my-4  text-end  fw-bolder`}>ابحث عن اقرب موقف</div>
          <div className={``}>
            {/* <SearchInput /> */}
            {/* <SelectLocation /> */}
          </div>
          <div className={`mb-2`}>
            <EndDateTime BookNow={BookNow} onReserveChange={handleReserveChange} setIsSearch={setIsSearch} />
          </div>
        </div>
      </div>
    </>
  );
}
