import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
export default function RegisterForm({ setShowFormStatus }) {
    const [registeUser, setRegisteUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        role: "",
        carType: "",
        city: "",
        state: "",
        region: "",
        plateNumber: "",
    })
    const [errors, setErrors] = useState({
        fristNameErrors: "*",
        lastNameErrors: "*",
        emailErrors: "*",
        passwordErrors: "*",
        confirmPasswordErrors: "*",
        phoneNumberErrors: "*",
        roleErrors: "*",
        carTypeErrors: "",
        cityErrors: "",
        stateErrors: "",
        regionErrors: "",
        plateNumberErrors: "",
    })
    let nameRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/
    let emailRegx = /^[a-zA-Z0-9]{4,15}(@)(gmail|yahoo|outlook)(.com)$/
    let passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[*:!#&^$.?#@])[a-zA-Z\d*:!#&^$.?#@]{8,}$/
    let phoneRegx = /^(?:(?:\+|00)968)?(9[1-9]\d{6})$/
    let roleRegx = /^(renter|driver)$/
    let carTypeRegx = /^(سيارة)$/
    let plateNumberRegx = /^[0-9]{5,}$/
    let cityRegx = /^(مسقط|مطرح|السيب|بوشر|العامرات|قريات)$/
    let stateRegx = /^(مسقط)$/
    let regionRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/
    const registeValidation = (event) => {
        const { name, value } = event.target;
        if (name === "firstName") {
            setErrors({
                ...errors, fristNameErrors: value.length === 0 ? "يجب ادخال الاسم الاول"
                    : nameRegx.test(value)
                        ? ""
                        : "يجب ادخال ثلاثة احرف بحد ادني",
            });
        }
        if (name === "lastName") {
            setErrors({
                ...errors, lastNameErrors: value.length === 0 ? "يجب ادخال الاسم الاخير"
                    : nameRegx.test(value)
                        ? ""
                        : "يجب ادخال ثلاثة احرف بحد ادني",
            });
        }
        if (name === "email") {
            setErrors({
                ...errors, emailErrors: value.length === 0 ? "يجب ادخال البريد الاليكتروني"
                    : emailRegx.test(value)
                        ? ""
                        : "يجب ادخال بريد اليكتروني صحيح",
            });
        }
        if (name === "password") {
            setErrors({
                ...errors, passwordErrors: value.length === 0 ? "يجب ادخال رقم سري" :
                    value.length <= 7 ?
                        "يحب ادخال 8 احرف بحد ادني"
                        : passwordRegx.test(value) ? ""
                            : "يجب ادخال حرف كبير وحرف صغير ورقم ورمز بحد ادني",
            });
        }
        if (name === "confirmPassword") {
            setErrors({
                ...errors, confirmPasswordErrors: value.length === 0 ? "يجب تاكيد الرقم السري" :
                    (value == registeUser.password) ? '' : 'الرقم غير صحيح'
            });
        }
        if (name === "phoneNumber") {
            setErrors({
                ...errors, phoneNumberErrors: value.length === 0 ? "يجب ادخال رقم الجوال"
                    : phoneRegx.test(value)
                        ? ""
                        : "يجب ادخال رقم جوال صحيح"
            });
        }
        if (name === "role") {
            setErrors({
                ...errors, roleErrors: value.length === 0 ? "يجب اختيار النوع"
                    : roleRegx.test(value)
                        ? ""
                        : "يجب اختيار من واحد من الاختيارات المقدمة"
            });
        }
        if (registeUser.role === 'driver') {
            if (name === "carType") {
                setErrors({
                    ...errors, carTypeErrors: value === "" ? "يجب اختيار نوع السيارة"
                        : carTypeRegx.test(value)
                            ? ""
                            : "النوع سيارة فقط"
                });
            }
            if (name === "plateNumber") {
                setErrors({
                    ...errors, plateNumberErrors: value.length === 0 ? "يجب رقم لوحة السيارة"
                        : plateNumberRegx.test(value)
                            ? ""
                            : "يجب ادخال رقم لوحة صحيح"
                });
            }
        }
        if (registeUser.role === 'renter') {
            if (name === "city") {
                setErrors({
                    ...errors, cityErrors: value.length === 0 ? "يجب اختيار الولاية"
                        : cityRegx.test(value)
                            ? ""
                            : "يجب اختيار من واحد من الاختيارات المقدمة"
                });
            }
            if (name === "state") {
                setErrors({
                    ...errors, stateErrors: value.length === 0 ? "يجب اختيار المحافظه"
                        : stateRegx.test(value)
                            ? ""
                            : "المحافظه المتاحة مسقط قفط",
                });
            }
            if (name === "region") {
                setErrors({
                    ...errors, regionErrors: value.length === 0 ? "يجب ادخال المنطقه"
                        : regionRegx.test(value)
                            ? ""
                            : "يجب ادخال ثلاثة احرف بحد ادني",
                });
            }
        }
        setRegisteUser({ ...registeUser, [name]: value });
    }
    console.log(errors);
    const handleSubmit = async (event) => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        // const isEmpty = Object.values(registeUser).some((registeUser) => registeUser === "");
        const formData = new FormData();
        if (hasErrors) {
            registeValidation(event)
            // event.preventDefault();
        } else {
            event.preventDefault();
            try {
                formData.append("firstName", registeUser.firstName);
                formData.append("lastName", registeUser.lastName);
                formData.append("email", registeUser.email);
                formData.append("password", registeUser.password);
                formData.append("confirmPassword", registeUser.confirmPassword);
                formData.append("phoneNumber", registeUser.phoneNumber);
                formData.append("role", registeUser.role);
                if (registeUser.role == 'renter') {
                    formData.append("city", registeUser.city);
                    formData.append("state", registeUser.state);
                    formData.append("region", registeUser.region);
                }
                if (registeUser.role == 'driver') {
                    formData.append("carType", registeUser.carType);
                    formData.append("plateNumber", registeUser.plateNumber);
                }
                const res = await axiosInstanceParking.post(`/users/signup`, formData);
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
            <form action="" method="post" onSubmit={handleSubmit} className="my-5">
                <div className="fs-4">
                    <div className={`d-md-flex d-block`}>
                        <div className="col-md-6 col-12 ms-md-1 ">
                            <label className="fs-5" htmlFor="firstName">الأسم الاول </label>
                            <input type="text" name="firstName" className={`${classes.input} form-control border-secondary shadow-none`} id="firstName"
                                onChange={registeValidation} onBlur={registeValidation} />
                            <p className={`${classes.error} text-danger`}>{errors.fristNameErrors}</p>
                        </div>
                        <div className="col-md-6 col-12 me-md-1">
                            <label className="fs-5" htmlFor="lastName">الأسم الاخير</label>
                            <input className={`${classes.input} form-control border-secondary shadow-none`} type="text" name="lastName" id="lastName"
                                onChange={registeValidation} onBlur={registeValidation} />
                            <p className={`${classes.error} text-danger`}>{errors.lastNameErrors}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label className="fs-5" htmlFor="email">الايميل</label>
                        <input type="email" id="email" name="email" className={`${classes.input} form-control border-secondary shadow-none`}
                            onChange={registeValidation} onBlur={registeValidation} />
                        <p className={`${classes.error} text-danger`}>{errors.emailErrors}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="password">كلمة السر</label>
                        <input type="password" id="password" name="password" className={`${classes.input} form-control border-secondary shadow-none`}
                            onChange={registeValidation} onBlur={registeValidation} />
                        <p className={`${classes.error} text-danger`}>{errors.passwordErrors}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="confirmPassword">تأكيد كلمه السر</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className={`${classes.input} form-control border-secondary shadow-none`}
                            onChange={registeValidation} onBlur={registeValidation} />
                        <p className={`${classes.error} text-danger`}>{errors.confirmPasswordErrors}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-5" htmlFor="phoneNumber">رقم الهاتف </label>
                        <input type="text" id="phoneNumber" onChange={registeValidation} onBlur={registeValidation}
                            name="phoneNumber" className={`${classes.input} form-control border-secondary shadow-none`} />
                        <p className={`${classes.error} text-danger`}>{errors.phoneNumberErrors}</p>
                    </div>
                    <label className="mt-4 fs-5 col-md-4 col-12"> نوع الحساب</label>
                    <div className="mt-2 row">
                        <div className="col-md-6 col-12 mt-3 mt-md-0">
                            <input type="radio" name="role" id="driver" value="driver"
                                onClick={displayIsDriver} className={`${classes.inputFilter} ms-2`}
                                onChange={registeValidation} onBlur={registeValidation} />
                            <label className="fs-5 ms-md-1" htmlFor="driver">
                                سائق
                            </label>
                        </div>
                        <div className="col-md-6 col-12 mt-3 mt-md-0">
                            <input type="radio" id="renter" name="role" value="renter"
                                onClick={displayIsOwner} className={`ms-1 ${classes.inputFilter}`}
                                onChange={registeValidation} onBlur={registeValidation} />
                            <label className="fs-5" htmlFor="renter"> صاحب موقف </label>
                        </div>
                    </div>
                    <p className={`${classes.error} text-danger`}>{errors.roleErrors}</p>
                    {isDriver && (
                        <>
                            <div className="mt-4">
                                <label className="fs-5" htmlFor="plateNumber">رقم اللوحة</label>
                                <input type="text" id="plateNumber" name="plateNumber" className={`${classes.input} form-control border-secondary shadow-none`}
                                    onChange={registeValidation} onBlur={registeValidation} />
                                <p className={`${classes.error} text-danger`}>{errors.plateNumberErrors}</p>
                            </div>
                            <div className="mt-4">
                                <label className="fs-5" htmlFor="carType">المركبة</label>
                                <select id="carType" name="carType" className={`${classes.input} form-control border border-secondary shadow-none`}
                                    onChange={registeValidation} onBlur={registeValidation}>
                                    <option value="" hidden>اختر نوع المركبة</option>
                                    <option value="سيارة">سيارة</option>
                                </select>
                                <p className={`${classes.error} text-danger`}>{errors.carTypeErrors}</p>
                            </div>
                            <input type="submit" value="submit"
                                //  className={`${classes.formBtn} text-center bgColor text-white btn mt-5`}
                                className={
                                    Object.values(errors).some((error) => error !== "")
                                        ? `btn bgColor text-white col-4 disabled`
                                        : `${classes.formBtn} text-center bgColor text-white btn mt-5`}
                                disabled={Object.values(errors).some((registerUser) => registerUser !== "")}
                            />
                        </>
                    )}
                    {isOwner && (
                        <>
                            <div className={`row mt-3`}>
                                <div className={`col-md-5 col-12`}>
                                    <label className="fs-5" htmlFor="state">المحافظه</label>
                                    <select className={`${classes.input} form-control border border-secondary shadow-none`} id="state" name="state"
                                        onChange={registeValidation} onBlur={registeValidation}>
                                        <option value="" hidden>اختر المحافظه</option>
                                        <option value="مسقط">مسقط</option>
                                    </select>
                                    <p className={`${classes.error} text-danger`}>{errors.stateErrors}</p>
                                </div>
                                <div className={`col-md-5 col-12`}>
                                    <label className="fs-5" htmlFor="city">
                                        الولاية
                                    </label>
                                    <select id="city" name="city" className={`${classes.input} form-control border border-secondary shadow-none`}
                                        onChange={registeValidation} onBlur={registeValidation}>
                                        <option value="" hidden>اختر الولاية</option>
                                        <option value="masqt">مسقط</option>
                                        <option value="mtrh">مطرح</option>
                                        <option value="seeb">السيب</option>
                                        <option value="boshr">بوشر</option>
                                        <option value="amrat">العامرات</option>
                                        <option value="qryat">قريات</option>
                                    </select>
                                    <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="fs-5" htmlFor="region">
                                    المنطقه
                                </label>
                                <input type="text" id="region" name="region" className={`${classes.input} form-control border-secondary shadow-none`}
                                    onChange={registeValidation} onBlur={registeValidation} />
                                <p className={`${classes.error} text-danger`}>{errors.regionErrors}</p>
                            </div>
                            <input type="submit" value="submit"
                                //  className={`${classes.formBtn} text-center bgColor text-white btn mt-5`} 
                                className={
                                    Object.values(errors).some((error) => error !== "")
                                        ? `btn bgColor text-white col-4 disabled`
                                        : `${classes.formBtn} text-center bgColor text-white btn mt-5`}
                                disabled={Object.values(errors).some((registerUser) => registerUser !== "")}
                            />
                        </>
                    )}
                </div>
            </form>
        </>
    );
}