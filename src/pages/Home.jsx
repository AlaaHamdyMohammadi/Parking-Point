import { FaLocationArrow } from "react-icons/fa";
import classes from './../styles/header.module.css';
export default function Home() {
    return (
        <div className={`container-fluid`}>
            <div className={`row`}>
                <div className={`col-12 col-md-6 d-flex align-items-center bgColor justify-content-center`}>
                    <div className={`w-75`}>
                        <div className={`fs-3 mb-5 text-light`}>اركن في أقرب موقف لك</div>
                        <div className={`position-relative md-w-75 w-100`}>
                            <FaLocationArrow className="fs-4 mt-2 ms-1 start-0 position-absolute iconColor" />
                            <input type="text" className={`form-control w-100`} placeholder="ادخل موقعك" />
                        </div>
                        <button className={`btn mt-5 btn-light`}>اعرض المواقف</button>
                    </div>
                </div>
                <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center bgColor`}>
                    <img src="./images/cars.png" className={`w-75`} alt=""/>
                </div>
            </div>
            <div className={`row`}>
                <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center `}>
                    <img src="./images/Parking-amico.png" className={`w-75 rounded`} alt="" />
                </div>
                <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center`}>
                    <div className={`col-8`}>
                    <div className={`fs-1 fw-bold mb-3`}>نبذه عنا</div>
                    <div className={`${classes.font}`}>
                        وهو المعادل الموضوعي في الجيزة لموقفي عبد المنعم رياض ورمسيس، من هناك تستطيع
                        أن تستقل ميكروباصات من وإلي أغلب الاتجاهات في القاهرة وستكون معاناتك من
                        هناك أقل لأن أغلب السائقين يتجنبون المرور في شارع الهرم، المزدحم جداً، قدر
                        المستطاع.
                        وهو المعادل الموضوعي في الجيزة لموقفي عبد المنعم
                        رياض ورمسيس، من هناك تستطيع أن تستقل ميكروباصات من وإلى أغلب
                        الاتجاهات في القاهرة وستكون معاناتك من هناك أقل؛ لأن أغلب السائقين
                        يتجنبون المرور
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
