import React, { useState } from "react";
import SearchInput from "./SearchInput";

import classes from "./../../styles/formStyles.module.css";
import EndDateTime from "./EndDT";
import SelectLocation from "./selectlocation";

export default function SearchSec() {
  const [BookNow, setBookNow] = useState(true);
  function handelBookNow() {
    setBookNow(true);
  }
  function handelBookLater() {
    setBookNow(false);
  }

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
        <div className={` shadow height p-2 border-secondary-subtlepx-2 rounded-3 w-100 height`}>
          <div className={` fs-4 my-2  fw-bolder`}>ابحث عن اقرب موقف</div>
          <div className={`mb-2`}>
            <SearchInput />
            <SelectLocation />
          </div>
          <div className={`mb-2`}>
            <EndDateTime BookNow={BookNow} />
          </div>

          <button className={`text-center bgColor text-white btn mt-2 ${classes.formBtn} `}>اعرض المواقف</button>
        </div>
      </div>
    </>
  );
}
