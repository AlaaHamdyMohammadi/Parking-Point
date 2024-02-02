import { FaLocationArrow } from "react-icons/fa";
export default function SearchInput() {
    return (
        <div>
            <div className={`position-relative md-w-75 w-100`}>
                <FaLocationArrow className="fs-4 mt-2 ms-1 start-0 position-absolute iconColor" />
                <input type="text" className={`form-control w-100`} placeholder="ادخل موقعك" />
            </div>
            <button className={`btn mt-5 btn-light`}>اعرض المواقف</button>
        </div>
    )
}
