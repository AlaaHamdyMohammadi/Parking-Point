import { FaLocationArrow } from "react-icons/fa";
export default function Home() {
    return (
        <div className={`container-fluid`}>
            <div className={`row`}>
                <div className={`col-12 col-md-6 bgColor d-flex align-items-center justify-content-center`}>
                    <div className={`w-75`}>
                        <div className={`fs-3 text-light mb-5`}>اركن في أقرب موقف لك</div>
                        <div className={`position-relative md-w-75 w-100`}>
                        <FaLocationArrow className="fs-4 mt-2 ms-1 start-0 position-absolute iconColor"/>
                    <input type="text" className={`form-control w-100`} placeholder="ادخل موقعك" />
                        </div>
                        <button className={`btn text-light`}>اعرض المواقف</button>
                    </div>
                </div>
                <div className={`col-12 col-md-6 bgColor`}>
                    <img src="./images/cars.png" className={`w-100`} alt="" />
                </div>
            </div>
        </div>
    )
}
