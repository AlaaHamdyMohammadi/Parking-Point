import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { changLog } from "../../store/slices/login";
import { useDispatch } from "react-redux";
export default function RegisterForm({setShowFormStatus}) {
  const dispatch= useDispatch()
  const displayLogin = () => {
    dispatch(changLog(false));
  };
    const [registeUser, setRegisteUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    })
    const [errors, setErrors] = useState({
        fristNameErrors: "",
        lastNameErrors: "",
        emailErrors: "",
        passwordErrors: "",
        confirmPasswordErrors: "",
        roleErrors: "",
    })
    // let nameRegx = /[a-z0-9]{2,}@[a-z]{5,}(\.)[a-z]+/
    // let emailRegx = /[a-z0-9]{2,}@[a-z]{5,}(\.)[a-z]+/
    // let passwordRegx = /[a-z0-9]{2,}@[a-z]{5,}(\.)[a-z]+/

    const registeValidation = (event) => {
        const { name, value } = event.target;
        if (name === "firstName") {
            setErrors({ ...errors, fristNameErrors: value.length === 0 ? "Plesse, Enter Your firstName" : "" });
        }
        if (name === "lastName") {
            setErrors({ ...errors, lastNameErrors: value.length === 0 ? "Plesse, Enter Your lastName" : "" });
        }
        if (name === "email") {
            setErrors({ ...errors, emailErrors: value.length === 0 ? "Plesse, Enter Your email" : "" });
        }
        if (name === "password") {
            setErrors({ ...errors, passwordErrors: value.length === 0 ? "Plesse, Enter Your Password" : "" });
        }
        if (name === "confirmPassword") {
            setErrors({ ...errors, confirmPasswordErrors: value.length === 0 ? "password not match" : "" });
        }
        if (name === "role") {
            setErrors({ ...errors, roleErrors: value.length === 0 ? "Plesse, chouse Your role" : "" });
        }
        setRegisteUser({ ...registeUser, [name]: value });
    }
    console.log(errors);
    const handleSubmit = async (event) => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        const isEmpty = Object.values(registeUser).some((registeUser) => registeUser === "");
        if (hasErrors || isEmpty) {
            event.preventDefault();
        } else {
            event.preventDefault();
            try {
                const res = await axiosInstanceParking.post(`/users/signup`, registeUser);
                console.log("signup request successful", res.data);
                setShowFormStatus(false)
            } catch (error) {
                console.log("signup request not successful", error);
            }
        }
    }
    console.log(registeUser);

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
            <form action="" method="post" onSubmit={handleSubmit}  className="my-5">
                <div className="fs-4">
                    <div className={`row`}>
                        <div className="col-md-5 col-12 ms-md-5 ">
                            <label className="fs-5" htmlFor="firstName">الأسم الاول </label>
                            <input type="text" name="firstName" className={`${classes.input} form-control border-secondary shadow-none`} id="firstName" 
                            onChange={registeValidation} onBlur={registeValidation}/>
                        </div>
                        <div className="col-md-5 col-12 me-md-4">
                            <label className="fs-5" htmlFor="lastName">الأسم الاخير</label>
                            <input className={`${classes.input} form-control border-secondary shadow-none`} type="text" name="lastName" id="lastName" 
                            onChange={registeValidation} onBlur={registeValidation}/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="email">الايميل</label>
                        <input type="email" id="email" name="email" className={`${classes.input} form-control border-secondary shadow-none`} 
                        onChange={registeValidation} onBlur={registeValidation}/>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="password">كلمة السر</label>
                        <input type="password" id="password" name="password" className={`${classes.input} form-control border-secondary shadow-none`} 
                        onChange={registeValidation} onBlur={registeValidation}/>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="confirmPassword">تأكيد كلمه السر</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className={`${classes.input} form-control border-secondary shadow-none`} 
                        onChange={registeValidation} onBlur={registeValidation}/>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="nummob">رقم الهاتف </label>
                        <input type="text" id="nummob" className={`${classes.input} form-control border-secondary shadow-none`} />
                    </div>
                    <label className="mt-4 fs-5 col-md-4 col-12"> نوع الحساب</label>
                    <div className="mt-2 row">
                        <div className="col-md-6 col-12 mt-3 mt-md-0">
                            <input type="radio" name="role" id="renter" value="renter"
                                onClick={ displayIsDriver} className={`${classes.inputFilter} ms-2`}
                                onChange={registeValidation} onBlur={registeValidation}/>
                            <label className="fs-5 ms-md-1" htmlFor="renter">
                                سائق
                            </label>
                        </div>
                        <div className="col-md-6 col-12 mt-3 mt-md-0">
                            <input type="radio" id="parker" name="role" value="parker"
                                onClick={displayIsOwner} className={`ms-1 ${classes.inputFilter}`}
                                onChange={registeValidation} onBlur={registeValidation}/>
                            <label className="fs-5" htmlFor="parker"> صاحب موقف </label>
                        </div>
                    </div>

                    {isDriver && (
                        <>
                            <div className="mt-4">
                                <label className="fs-5" htmlFor="numboard">رقم اللوحة</label>
                                <input type="text" id="numboard" className={`${classes.input} form-control border-secondary shadow-none`} />
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
                                <input type="text" id="area" className={`${classes.input} form-control border-secondary shadow-none`} />
                            </div>
                            <input type="submit" value="submit" className={`${classes.formBtn} text-center bgColor text-white btn mt-5`} />
                        </>
                    )}
                </div>
            </form>
        </>
    );
}