import { useState } from "react";
import InputEdit from "../../components/profile/InputEdit";
import SelectEdit from "../../components/profile/selectEdit";
import Photoprofile from "./../../components/profile/photoprofile";
import classes from "./../../styles/formStyles.module.css";
import useLogInUserData from "../../../hook/useLogInUserData";

export default function EditProfile() {
  const user = useLogInUserData();
  console.log(user);
  const [registeUser, setRegisteUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: "",
    city: "",
    state: "",
    region: "",
    plateNumber: "",
  });
  const [errors, setErrors] = useState({
    fristNameErrors: "*",
    lastNameErrors: "*",
    emailErrors: "*",
    phoneNumberErrors: "*",
    cityErrors: "",
    stateErrors: "",
    regionErrors: "",
    plateNumberErrors: "",
  });
  let nameRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
  let emailRegx = /^[a-zA-Z0-9]{4,15}(@)(gmail|yahoo|outlook)(.com)$/;
  let phoneRegx = /^(?:(?:\+|00)968)?(9[1-9]\d{6})$/;
  let carTypeRegx = /^(سيارة)$/;
  let plateNumberRegx = /^[0-9]{5,}$/;
  let cityRegx = /^(masqt|mtrh|seeb|boshr|amrat|qryat)$/;
  let stateRegx = /^(مسقط)$/;
  let regionRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
  const registeValidation = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setErrors({
        ...errors,
        fristNameErrors:
          value.length === 0 ? "يجب ادخال الاسم الاول" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
      });
    }
    if (name === "lastName") {
      setErrors({
        ...errors,
        lastNameErrors:
          value.length === 0 ? "يجب ادخال الاسم الاخير" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
      });
    }
    if (name === "email") {
      setErrors({
        ...errors,
        emailErrors:
          value.length === 0 ? "يجب ادخال البريد الاليكتروني" : emailRegx.test(value) ? "" : "يجب ادخال بريد اليكتروني صحيح",
      });
    }
    if (name === "phoneNumber") {
      setErrors({
        ...errors,
        phoneNumberErrors:
          value.length === 0 ? "يجب ادخال رقم الجوال" : phoneRegx.test(value) ? "" : "يجب ادخال رقم جوال صحيح",
      });
    }
    if (registeUser.role === "driver") {
      if (name === "carType") {
        setErrors({
          ...errors,
          carTypeErrors: value === "" ? "يجب اختيار نوع السيارة" : carTypeRegx.test(value) ? "" : "النوع سيارة فقط",
        });
      }
      if (name === "plateNumber") {
        setErrors({
          ...errors,
          plateNumberErrors:
            value.length === 0 ? "يجب رقم لوحة السيارة" : plateNumberRegx.test(value) ? "" : "يجب ادخال رقم لوحة صحيح",
        });
      }
    }
    if (registeUser.role === "renter") {
      if (name === "city") {
        setErrors({
          ...errors,
          cityErrors:
            value.length === 0
              ? "يجب اختيار الولاية"
              : cityRegx.test(value)
              ? ""
              : "يجب اختيار من واحد من الاختيارات المقدمة",
        });
      }
      if (name === "state") {
        setErrors({
          ...errors,
          stateErrors: value.length === 0 ? "يجب اختيار المحافظه" : stateRegx.test(value) ? "" : "المحافظه المتاحة مسقط قفط",
        });
      }
      if (name === "region") {
        setErrors({
          ...errors,
          regionErrors:
            value.length === 0 ? "يجب ادخال المنطقه" : regionRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
        });
      }
    }
    setRegisteUser({ ...registeUser, [name]: value });
  };
  console.log(errors);
  // const handleSubmit = async (event) => {
  //   const hasErrors = Object.values(errors).some((error) => error !== "");
  //   // const isEmpty = Object.values(registeUser).some((registeUser) => registeUser === "");
  //   const formData = new FormData();
  //   if (hasErrors) {
  //     registeValidation(event);
  //     // event.preventDefault();
  //   } else {
  //     event.preventDefault();
  //     try {
  //       formData.append("firstName", registeUser.firstName);
  //       formData.append("lastName", registeUser.lastName);
  //       formData.append("email", registeUser.email);
  //       formData.append("password", registeUser.password);
  //       formData.append("confirmPassword", registeUser.confirmPassword);
  //       formData.append("phoneNumber", registeUser.phoneNumber);
  //       formData.append("role", registeUser.role);
  //       if (registeUser.role == "renter") {
  //         formData.append("city", registeUser.city);
  //         formData.append("state", registeUser.state);
  //         formData.append("region", registeUser.region);
  //       }
  //       if (registeUser.role == "driver") {
  //         formData.append("carType", registeUser.carType);
  //         formData.append("plateNumber", registeUser.plateNumber);
  //       }
  //       const res = await axiosInstanceParking.post(`/users/signup`, formData);
  //       console.log("signup request successful", res.data);
  //       setShowFormStatus(false);
  //     } catch (error) {
  //       console.log("signup request not successful", error);
  //     }
  //   }
  // };
  return (
    <>
     <Photoprofile photo={`/images/defaultpersonjpg.jpg`} time={`عضو منذ 5 اسابيع`} />
      <div className="d-flex flex-column mt-5  align-self-center gap-6 align-self-start w-75">
        <div className="row flex-column flex-sm-row ">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputEdit label="الأسم الأول" placeholder={registeUser.firstName} type="text" setState={setRegisteUser} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputEdit label="الأسم الثاني" placeholder={registeUser.lastName} type="text" setState={setRegisteUser} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputEdit label="رقم الهاتف" placeholder={registeUser.phoneNumber} type="number" setState={setRegisteUser} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputEdit label="الأيميل" placeholder={registeUser.email} type="email" setState={setRegisteUser} />
          </div>
          {user.role === "driver" && (
            <>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <SelectEdit label="نوع المركبة" option1="سيارة" setState={setRegisteUser} />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <InputEdit label="رقم اللوحة" placeholder="142536 *" type="number" setState={setRegisteUser} />
              </div>
            </>
          )}
          {user.role == 'renter' && (
            <>
              <div className={`col-lg-6 col-md-5 col-12`}>
                <label className="fs-5" htmlFor="state">
                  المحافظه
                </label>
                <select
                  className={`${classes.input} form-control border border-secondary shadow-none`}
                  id="state"
                  name="state"
                  onChange={registeValidation}
                  onBlur={registeValidation}
                  value={registeUser.state}>
                 <option value={` `} selected disabled>
                    حدد المحافظة
                  </option>
                  <option value="مسقط">مسقط</option>
                </select>
                <p className={`${classes.error} text-danger`}>{errors.stateErrors}</p>
              </div>
              <div className={` col-lg-6 col-md-5 col-12`}>
                <label className="fs-5" htmlFor="city">
                  الولاية
                </label>
                <select
                  id="city"
                  name="city"
                  value={registeUser.city}
                  className={`${classes.input} form-control border border-secondary shadow-none`}
                  onChange={registeValidation}
                  onBlur={registeValidation}>
                  <option value={` `} selected hidden>
                حدد الولاية
              </option>
                  <option value="masqt">مسقط</option>
                  <option value="mtrh">مطرح</option>
                  <option value="seeb">السيب</option>
                  <option value="boshr">بوشر</option>
                  <option value="amrat">العامرات</option>
                  <option value="qryat">قريات</option>
                </select>
                <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
              </div>
              {/* </div> */}
              <div className=" col-lg-6 col-md-5 col-12">
                <label className="fs-5" htmlFor="region">
                  المنطقه
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  className={`${classes.input} form-control border-secondary shadow-none`}
                  //  onChange={registeValidation}
                  //  onBlur={registeValidation}
                />

                <p className={`${classes.error} text-danger`}>{errors.regionErrors} </p>
              </div>
            </>
          )}
        </div>

        <div className="row d-flex justify-content-center">
          <input type="submit" value="تحديث" className={`text-center bgColor w-50 text-white btn mt-2 ${classes.formBtn}`} />
        </div>
      </div>
    </>
  );
}
