/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";

import { login } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfimEmailPop from "./confirmEmailpop";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import NameInputs from "../FormsValidations/formFun/NameInputs";
import NameLastInputs from "../FormsValidations/formFun/NameLastInputs";
import EmailInput from "../FormsValidations/formFun/EmailInput";
import PhoneInput from "../FormsValidations/formFun/PhoneInput";
import PlateNumberInput from "../FormsValidations/formFun/PlateNumberInput";
import CarTypeInput from "../FormsValidations/formFun/CarTypeInput";
import StateInput from "../FormsValidations/formFun/StateInput";
import CitySelect from "../FormsValidations/formFun/CitySelect";
import RegionInput from "../FormsValidations/formFun/RegionInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function RegisterForm({ setShowFormStatus }) {
  const { t } = useTranslation();
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
            ? t("registerPass1")
            : value.length <= 7
            ? t("registerPass2")
            : passwordRegx.test(value)
            ? ""
            : t("registerPass3"),
      });
    }
    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPasswordErrors:
          value.length === 0
            ? t("registerConfirmPass1")
            : value == registeUser.password
            ? ""
            : t("registerConfirmPass2"),
      });
    }
    if (name === "role") {
      setErrors({
        ...errors,
        roleErrors:
          value.length === 0
            ? t("registerRole1")
            : roleRegx.test(value)
            ? ""
            : t("registerRole2"),
      });
    }
    if (registeUser.role === "renter") {
      if (name === "nationalId") {
        setErrors({
          ...errors,
          nationalIdErrors:
            value.length === 0
              ? t("registerErr1")
              : regionRegx.test(value)
              ? ""
              : t("registerErr2"),
        });
      }
    }
    setRegisteUser({ ...registeUser, [name]: value });
  };
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
        toast.success(t("successRegistration"));
        setTimeout(() => {
          setShowEmailModal(true);
          setShowFormStatus(false);
        }, 2000);
        // dispatch(login(res.data.token));
      } catch (error) {
        if (error.response.request.response.includes(registeUser.email)) {
          setErrors({
            ...errors,
            emailErrors: t("registerEmailErr1"),
          });
        } else if (
          error.response.request.response.includes(registeUser.phoneNumber)
        ) {
          setErrors({
            ...errors,
            phoneNumberErrors: t("registerMobileErr1"),
          });
        } else if (
          error.response.request.response.includes(registeUser.plateNumber)
        ) {
          setErrors({
            ...errors,
            plateNumberErrors: t("registerPlateErr1"),
          });
        } else if (
          error.response.request.response.includes(registeUser.nationalId)
        ) {
          setErrors({
            ...errors,
            nationalIdErrors: t("registerIDErr1"),
          });
        } else {
          //console.log("signup request not successful", error.response.request);
        }
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);

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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
              disabled={false}
            />
          </div>
          <div className="mt-4">
            <label className="fs-5" htmlFor="password">
              {t("password")}
            </label>
            <div className="d-flex  w-100 justify-content-end">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`${classes.input} form-control border-secondary shadow-none`}
                onChange={registeValidation}
                onBlur={registeValidation}
              />
              <button
                type="button"
                className="btn Gray border-0"
                style={{ position: "absolute", zIndex: "1" }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>
            <p className={`${classes.error} text-danger`}>
              {errors.passwordErrors}
            </p>
          </div>
          <div className="mt-4">
            <label className="fs-5" htmlFor="confirmPassword">
              {t("confirmPassword")}
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
          <label className="mt-4 fs-5 col-md-4  col-12">
            <div className="">{t("registerAccontType")}</div>
          </label>
          <div className="mt-2 row">
            <div className="col-md-6 col-12 mt-3 mt-md-0">
              <input
                type="radio"
                name="role"
                id="driver"
                value="driver"
                onClick={displayIsDriver}
                className={`${classes.inputFilter} mx-2`}
                onChange={registeValidation}
                onBlur={registeValidation}
              />
              <label className="fs-5 ms-md-1 m-2 " htmlFor="driver">
                {t("registerAccontType1")}
              </label>
            </div>
            <div className="col-md-6 col-12 mt-3 mt-md-0">
              <input
                type="radio"
                id="renter"
                name="role"
                value="renter"
                onClick={displayIsOwner}
                className={`mx-2 ${classes.inputFilter}`}
                onChange={registeValidation}
                onBlur={registeValidation}
              />
              <label className="fs-5" htmlFor="renter">
                {t("registerAccontType2")}
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
                value={t("createAccout")}
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
                  {t("nationalId")}
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
                  value={t("createAccout")}
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
        <ToastContainer position="top-right" autoClose={2000} />
      </form>
    </>
  );
}
