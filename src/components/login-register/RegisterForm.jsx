import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
export default function RegisterForm() {
    const [fristName, setFristName] = useState("");
    const [lastName, setILastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswrd, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [accountType, setAccountType] = useState("");
    const [governorate, setGovernorate] = useState("");
    const [state, setState] = useState("");
    const [region, setRegion] = useState("");
    
    const [isDriver, setIsDriver] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const displayIsDriver = (event) => {
        if (event.target.checked == true) {
            setIsDriver(true);
            setIsOwner(false);
        }
    };
    const displayIsOwner = (event) => {
        if (event.target.checked == true) {
            setIsDriver(false);
            setIsOwner(true);
        }
    };
    return (
        <>
                <form action="" className="my-5">
            <div className="fs-4">
                <div className={`row`}>
                    <div className="col-md-5 col-12 ms-md-5 ">
                        <label className="fs-5" htmlFor="fullname">الأسم الاول </label>
                        <input type="text" className={`${classes.input} form-control border-secondary shadow-none`} id="fullname" />
                    </div>
                    <div className="col-md-5 col-12 me-md-4">
                        <label className="fs-5" htmlFor="lastlname">الأسم الاخير</label>
                        <input className={`${classes.input} form-control border-secondary shadow-none`} type="text" id="lastname" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="fs-5" htmlFor="email">الايميل</label>
                    <input type="email" id="email" className={`${classes.input} form-control border-secondary shadow-none`}/>
                </div>
                <div className="mt-4">
                    <label className="fs-5" htmlFor="password">كلمة السر</label>
                    <input type="password" id="password" className={`${classes.input} form-control border-secondary shadow-none`}/>
                </div>
                <div className="mt-4">
                    <label className="fs-5" htmlFor="confirmpassword">تأكيد كلمه السر</label>
                    <input type="password" id="confirmpassword" className={`${classes.input} form-control border-secondary shadow-none`}/>
                </div>
                <div className="mt-4">
                    <label className="fs-5" htmlFor="nummob">رقم الهاتف </label>
                    <input type="text" id="nummob" className={`${classes.input} form-control border-secondary shadow-none`}/>
                </div>
                <label className="mt-4 fs-5 col-md-4 col-12"> نوع الحساب</label>
                <div className="mt-2 row">
                <div className="col-md-6 col-12 mt-3 mt-md-0">
                <input
                    type="radio"
                    name="acctype"
                    id="driver"
                    value="driver"
                    onChange={(eve) => { displayIsDriver(eve);}}
                    className={`${classes.inputFilter} ms-2`}
                    />
                <label className="fs-5 ms-md-1" htmlFor="driver">
                    سائق
                </label>
                </div>
                <div className="col-md-6 col-12 mt-3 mt-md-0">
                <input
                    type="radio"
                    id="owner"
                    name="acctype"
                    value="owner"
                    onChange={(eve) => {
                        displayIsOwner(eve);
                    }}
                    className={`ms-1 ${classes.inputFilter}`}
                    />
                <label className="fs-5" htmlFor="owner">
                    صاحب موقف
                </label>
                </div>
                    </div>

                {isDriver && (
                    <>
                        <div className="mt-4">
                            <label className="fs-5" htmlFor="numboard">رقم اللوحة</label>
                            <input type="text" id="numboard" className={`${classes.input} form-control border-secondary shadow-none`}/>
                        </div>
                        <div className="mt-4">
                            <label className="fs-5" htmlFor="cars">المركبة</label>
                            <select id="cars" name="cars" className={`${classes.input} form-control border border-secondary shadow-none`}>
                                <option value="" hidden>اختر نوع المركبة</option>
                                <option value="car">سيارة</option>
                            </select>
                        </div>
                        <input type="submit" value="submit" className={`${classes.formBtn} text-center bgColor text-white btn mt-5`} />
                    </>
                )}
                {isOwner && (
                    <>
                        <div className={`row mt-3`}>
                            <div className={`col-md-5 col-12`}>
                                <label className="fs-5" htmlFor="Governorate">المحافظه</label>
                                <select className={`${classes.input} form-control border border-secondary shadow-none`} id="cars" name="cars">
                                    <option value="" hidden>اختر المحافظه</option>
                                    <option value="masqt">مسقط</option>
                                </select>
                            </div>
                            <div className={`col-md-5 col-12`}>
                                <label className="fs-5" htmlFor="Governorate">
                                    الولاية
                                </label>
                                <select id="cars" name="cars" className={`${classes.input} form-control border border-secondary shadow-none`}>
                                    <option value="" hidden>اختر الولاية</option>
                                    <option value="masqt">مسقط</option>
                                    <option value="mtrh">مطرح</option>
                                    <option value="seeb">السيب</option>
                                    <option value="boshr">بوشر</option>
                                    <option value="amrat">العامرات</option>
                                    <option value="qryat">قريات</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                        <label className="fs-5" htmlFor="area">
                            المنطقه{" "}
                        </label>
                        <input type="text" id="area" className={`${classes.input} form-control border-secondary shadow-none`}/>
                        </div>
                        <input type="submit" value="submit" className={`${classes.formBtn} text-center bgColor text-white btn mt-5`} />
                    </>
                )}
            </div>
            </form>
        </>
    );
}