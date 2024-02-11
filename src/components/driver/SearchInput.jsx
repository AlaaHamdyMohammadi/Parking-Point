// import { FaLocationArrow } from "react-icons/fa";
// import { LiaSearchLocationSolid } from "react-icons/lia";
import { LiaSearchLocationSolid } from "react-icons/lia";

export default function SearchInput() {
  return (
    <div>
      <div className={`position-relative md-w-75 w-100`}>
        <LiaSearchLocationSolid className={`fw-bolder fs-5  ms-2 start-0 mt-3 position-absolute iconColor`} />
        <input type="text" className={` my-1  p-2  w-100`} placeholder="ابحث عن اقرب موقف لك" />
      </div>
    </div>
  );
}
