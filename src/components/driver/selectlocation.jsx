import { FaLocationArrow } from "react-icons/fa";
export default function SelectLocation() {
  return (
    <div>
      <div className={`position-relative md-w-75 w-100`}>
        <FaLocationArrow className="fs-3  mt-2 start-0 position-absolute iconColor" />
        <input type="text" className={` my-2 fs-5 w-100`} placeholder="ادخل موقعك" />
      </div>
    </div>
  );
}
