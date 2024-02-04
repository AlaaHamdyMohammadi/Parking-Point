// import { FaLocationArrow } from "react-icons/fa";
// import { LiaSearchLocationSolid } from "react-icons/lia";
import { FaSearchLocation } from "react-icons/fa";

export default function SearchInput() {
  return (
    <div>
      <div className={`position-relative md-w-75 w-100`}>
        <FaSearchLocation className={`fs-3 ms-1 start-0 rotate-icon position-absolute iconColor`} />
        <input type="text" className={` my-1  p-2 fs-5 w-100`} placeholder="ابحث عن اقرب موقف لك" />
      </div>
    </div>
  );
}
