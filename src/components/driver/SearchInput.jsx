import { FaSearchLocation } from "react-icons/fa";

export default function SearchInput() {
  return (
    <div className={`position-relative md-w-75 p-2  w-100`}>
      <FaSearchLocation className={`fw-bolder fs-3 p-1  ms-2 start-0 mt-2 pt-2 position-absolute iconColor`} />
      <input
        type="text"
        className={` my-1  p-2 border border-secondary  shadow-none rounded-2  w-100`}
        placeholder="اسم الولاية ...."
      />
    </div>
  );
}
