import { FaLocationDot } from "react-icons/fa6";
export default function SelectLocation() {
  return (
    <div>
      <div className={`position-relative md-w-75 p-2  w-100`}>
        <FaLocationDot className="fs-2 p-1 ps-3 pt-2 mt-2 start-0  position-absolute iconColor" />
        <input
          type="text"
          className={` my-1 p-2  border border-secondary  shadow-none rounded-2  w-100`}
          placeholder="موقعك الآن..."
        />
      </div>
    </div>
  );
}
