/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import CitySelect from "../formFun/CitySelect";
import StateInput from "../formFun/StateInput";
import RegionInput from "../formFun/RegionInput";
import NameInputs from "../formFun/nameInputs";
import EmailInput from "../formFun/EmailInput";
import PhoneInput from "../formFun/PhoneInput";
import PlateNumberInput from "../formFun/PlateNumberInput";
import CarTypeInput from "../formFun/CarTypeInput";
// import ModalEmail from "./emailConfirm";
import ConfirmationCodeInput from "./confirmEmail";
import { login } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfimEmailPop from "./confirmEmailpop";
import NameLastInputs from "../formFun/NameLastInputs";
export default function RegisterForm({ setShowFormStatus }) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const dispatch = useDispatch();
  const [registeUser, setRegisteUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    carType: "سيارة",
    city: "",
    state: "مسقط",
    region: "",
    plateNumber: "",
    nationalId: "",
  });
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
    nationalIdErrors: "",
  });
  let passwordRegx = /^[a-zA-Z0-9]{8,}$/;
  let roleRegx = /^(renter|driver)$/;
  let regionRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
  const registeValidation = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setErrors({
        ...errors,
        passwordErrors:
          value.length === 0
            ? "يجب ادخال رقم سري"
            : value.length <= 7
            ? "يحب ادخال 8 احرف بحد ادني"
            : passwordRegx.test(value)
            ? ""
            : "يجب ادخال حرف كبير وحرف صغير ورقم بحد ادني",
      });
    }
    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPasswordErrors:
          value.length === 0
            ? "يجب تاكيد الرقم السري"
            : value == registeUser.password
            ? ""
            : "الرقم غير صحيح",
      });
    }
    if (name === "role") {
      setErrors({
        ...errors,
        roleErrors:
          value.length === 0
            ? "يجب اختيار النوع"
            : roleRegx.test(value)
            ? ""
            : "يجب اختيار من واحد من الاختيارات المقدمة",
      });
    }
    if (registeUser.role === "renter") {
      if (name === "nationalId") {
        setErrors({
          ...errors,
          nationalIdErrors:
            value.length === 0
              ? "يجب ادخال رقم الهوية"
              : regionRegx.test(value)
              ? ""
              : "يجب ادخال ثلاثة احرف بحد ادني",
        });
      }
    }
    setRegisteUser({ ...registeUser, [name]: value });
  };
  console.log(errors);
  const handleSubmit = async (event) => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const formData = new FormData();
    if (hasErrors) {
      registeValidation(event);
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
        if (registeUser.role == "renter") {
          formData.append("city", registeUser.city);
          formData.append("state", registeUser.state);
          formData.append("region", registeUser.region);
          formData.append("nationalId", registeUser.nationalId);
        }
        if (registeUser.role == "driver") {
          formData.append("carType", registeUser.carType);
          formData.append("plateNumber", registeUser.plateNumber);
        }
        const res = await axiosInstanceParking.post(`/users/signup`, formData);
        console.log("signup request successful", res.data);
        dispatch(login(res.data.token));
        setShowEmailModal(true);
      } catch (error) {
        if (error.response.request.response.includes(registeUser.email)) {
          setErrors({
            ...errors,
            emailErrors: "البريد الاليكتروني مستخدم من قبل",
          });
        } else if (
          error.response.request.response.includes(registeUser.phoneNumber)
        ) {
          setErrors({
            ...errors,
            phoneNumberErrors: "رقم الجوال مستخدم من قبل",
          });
        } else if (
          error.response.request.response.includes(registeUser.plateNumber)
        ) {
          setErrors({
            ...errors,
            plateNumberErrors: "رقم اللوحة مستخدم من قيل",
          });
          console.log("signup request not successful", error.response.request);
        } else if (
          error.response.request.response.includes(registeUser.nationalId)
        ) {
          setErrors({
            ...errors,
            nationalIdErrors: "رقم الهوية مستخدم من قبل",
          });
        } else {
          console.log("signup request not successful", error.response.request);
        }
      }
    }
  };
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
  const token = useSelector((state) => state.loggedIn.token);

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit} className="my-5">
        <div className="fs-4">
          <div className={`d-md-flex d-block`}>
            <NameInputs
              nameInfo={registeUser}
              classes={classes}
              setNameInfo={setRegisteUser}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
          <div className={`d-md-flex d-block`}>
            <NameLastInputs
              lastNameInfo={registeUser}
              classes={classes}
              setLastNameInfo={setRegisteUser}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
          <div className="mt-2">
            <EmailInput
              emailInfo={registeUser}
              classes={classes}
              setEmailInfo={setRegisteUser}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
          <div className="mt-4">
            <label className="fs-5" htmlFor="password">
              كلمة السر
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${classes.input} form-control border-secondary shadow-none`}
              onChange={registeValidation}
              onBlur={registeValidation}
            />

            <p className={`${classes.error} text-danger`}>
              {errors.passwordErrors}
            </p>
          </div>
          <div className="mt-4">
            <label className="fs-5" htmlFor="confirmPassword">
              تأكيد كلمه السر
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`${classes.input} form-control border-secondary shadow-none`}
              onChange={registeValidation}
              onBlur={registeValidation}
            />
            <p className={`${classes.error} text-danger`}>
              {errors.confirmPasswordErrors}
            </p>
          </div>
          <div className="mt-4">
            <PhoneInput
              phoneNumberInfo={registeUser}
              classes={classes}
              setPhoneNumberInfo={setRegisteUser}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
          <label className="mt-4 fs-5 col-md-4 col-12"> نوع الحساب</label>
          <div className="mt-2 row">
            <div className="col-md-6 col-12 mt-3 mt-md-0">
              <input
                type="radio"
                name="role"
                id="driver"
                value="driver"
                onClick={displayIsDriver}
                className={`${classes.inputFilter} ms-2`}
                onChange={registeValidation}
                onBlur={registeValidation}
              />
              <label className="fs-5 ms-md-1" htmlFor="driver">
                مُستأجر
              </label>
            </div>
            <div className="col-md-6 col-12 mt-3 mt-md-0">
              <input
                type="radio"
                id="renter"
                name="role"
                value="renter"
                onClick={displayIsOwner}
                className={`ms-1 ${classes.inputFilter}`}
                onChange={registeValidation}
                onBlur={registeValidation}
              />
              <label className="fs-5" htmlFor="renter">
                مُؤجر
              </label>
            </div>
          </div>
          <p className={`${classes.error} text-danger`}>{errors.roleErrors}</p>
          {isDriver && (
            <>
              <div className="mt-4">
                <PlateNumberInput
                  plateNumberInfo={registeUser}
                  classes={classes}
                  setPlateNumberInfo={setRegisteUser}
                  errors={errors}
                  setErrors={setErrors}
                />
              </div>
              <div className="mt-4">
                <CarTypeInput
                  carTypeInfo={registeUser}
                  classes={classes}
                  setCarTypeInfo={setRegisteUser}
                  errors={errors}
                  setErrors={setErrors}
                />
              </div>
              <input
                type="submit"
                data-bs-toggle={showEmailModal ? "modal" : ""}
                data-bs-target={showEmailModal ? "#staticBackdrop" : ""}
                value="إنشاء حساب"
                className={
                  Object.values(errors).some((error) => error !== "")
                    ? `btn bgColor text-white col-4 disabled`
                    : `${classes.formBtn} text-center bgColor text-white btn mt-5`
                }
                disabled={Object.values(errors).some(
                  (registerUser) => registerUser !== ""
                )}
              />
              <ConfimEmailPop userEmail={registeUser.email} />
            </>
          )}
          {isOwner && (
            <>
              <div className={`row mt-3`}>
                <div className={`col-md-5 col-12`}>
                  <StateInput
                    stateInfo={registeUser}
                    classes={classes}
                    setStateInfo={setRegisteUser}
                    errors={errors}
                    setErrors={setErrors}
                  />
                </div>
                <div className={`col-md-5 col-12`}>
                  <CitySelect
                    cityInfo={registeUser}
                    classes={classes}
                    setCityInfo={setRegisteUser}
                    errors={errors}
                    setErrors={setErrors}
                  />
                </div>
              </div>
              <div className="mt-4">
                <RegionInput
                  regionInfo={registeUser}
                  classes={classes}
                  setRegionInfo={setRegisteUser}
                  errors={errors}
                  setErrors={setErrors}
                />
              </div>
              <div className="mt-4">
                <label className="fs-5" htmlFor="nationalId">
                  رقم الهوية
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  className={`${classes.input} form-control border-secondary shadow-none`}
                  onChange={registeValidation}
                  onBlur={registeValidation}
                />
                <p className={`${classes.error} text-danger`}>
                  {errors.nationalIdErrors}
                </p>
              </div>
              <div>
                <input
                  type="submit"
                  value="إنشاء حساب"
                  data-bs-toggle={showEmailModal ? "modal" : ""}
                  data-bs-target={showEmailModal ? "#staticBackdrop" : ""}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? `btn bgColor text-white col-4 disabled`
                      : `${classes.formBtn} text-center bgColor text-white btn mt-5`
                  }
                  disabled={Object.values(errors).some(
                    (registerUser) => registerUser !== ""
                  )}
                />
                <ConfimEmailPop userEmail={registeUser.email} />
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}
