import { LiaSearchLocationSolid } from "react-icons/lia";
import { FaSearchLocation } from "react-icons/fa";
import classes from "./../../styles/register.module.css";

export default function SearchInput() {
  return (
    <div className={`${classes.customSelectWrapper} Gray container  text-center w-100 mx-2 mb-2  `}>
      <select
        id="cars"
        name="cars"
        className={`w-100 border border-0 rounded-2  p-1  pointer shadow-none customRange Gray `}
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
  );
}

{
  /* <div className={`position-relative md-w-75 p-2  w-100`}>
        <FaSearchLocation className={`fw-bolder fs-3 p-1  ms-2 start-0 mt-2 pt-2 position-absolute iconColor`} />
        <input
          type="text"
          className={` my-1  p-2 border border-secondary  shadow-none rounded-2  w-100`}
          placeholder="اسم الولاية ...."
        />
      </div> */
}
{
  /* <label className="fs-5" htmlFor="Governorate">
        الولاية
      </label> */
}
