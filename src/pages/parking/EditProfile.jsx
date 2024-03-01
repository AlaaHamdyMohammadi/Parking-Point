import { useState } from "react";
import Photoprofile from "./../../components/profile/photoprofile";
import classes from "./../../styles/formStyles.module.css";
import useLogInUserData from "../../../hook/useLogInUserData";
import CitySelect from "../../components/formFun/CitySelect";
import StateInput from "../../components/formFun/StateInput";
import RegionInput from "../../components/formFun/RegionInput";
import EmailInput from "../../components/formFun/EmailInput";
import PhoneInput from "../../components/formFun/PhoneInput";
import NameInputs from "../../components/formFun/nameInputs";
import PlateNumberInput from "../../components/formFun/PlateNumberInput";
import CarTypeInput from "../../components/formFun/CarTypeInput";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const token = useSelector((state) => state.loggedIn.token);
  const user = useLogInUserData();
  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    city: user.city,
    state: user.state,
    region: user.region,
    plateNumber: user.plateNumber,
    carType: user.carType,
  });
  const [errors, setErrors] = useState({
    fristNameErrors: "",
    lastNameErrors: "",
    emailErrors: "",
    phoneNumberErrors: "",
    cityErrors: "",
    stateErrors: "",
    nationaleIdErrors: "",
    regionErrors: "",
    plateNumberErrors: "",
    carTypeErrors: "",
  });
  const handleSubmit = async (event) => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(userInfo).some((userInf) => userInf === "");
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      event.preventDefault();
      try {
        const res = await axiosInstanceParking.patch(`/users/me`, userInfo, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = res.data;
        console.log(userData);
      } catch (error) {
        console.error("not login", error);
      }
    }
  }
  return (
    <>
      <Photoprofile photo={`/images/defaultpersonjpg.jpg`} time={`عضو منذ ${new Date(user.createdAt).toLocaleDateString()}`} />
      <form method="post" onSubmit={handleSubmit}>

        <div className="d-flex flex-column mt-5  align-self-center gap-6 align-self-start w-75">
          <div className="row flex-column flex-sm-row ">
            <NameInputs nameInfo={userInfo} classes={classes} setNameInfo={setUserInfo} errors={errors} setErrors={setErrors} />
            <div className="col-md-6 col-12">
              <PhoneInput phoneNumberInfo={userInfo} classes={classes} setPhoneNumberInfo={setUserInfo} errors={errors} setErrors={setErrors} />
            </div>
            <div className="col-md-6 col-sm-12">
              <EmailInput emailInfo={userInfo} classes={classes} setEmailInfo={setUserInfo} errors={errors} setErrors={setErrors} />
            </div>
            {user.role === "driver" &&
              <>
                <div className="col-md-6 col-sm-12">
                  <CarTypeInput carTypeInfo={userInfo} classes={classes} setCarTypeInfo={setUserInfo} errors={errors} setErrors={setErrors} />
                </div>
                <div className="col-md-6 col-sm-12">
                  <PlateNumberInput plateNumberInfo={userInfo} classes={classes} setPlateNumberInfo={setUserInfo} errors={errors} setErrors={setErrors} />
                </div>
              </>
            }
            {user.role == "renter" &&
              <>
                <div className="col-md-6 col-12">
                  <CitySelect cityInfo={userInfo} classes={classes} setCityInfo={setUserInfo} errors={errors} setErrors={setErrors} />
                </div>
                <div className="col-md-6 col-12">
                  <RegionInput regionInfo={userInfo} classes={classes} setRegionInfo={setUserInfo} errors={errors} setErrors={setErrors} />
                </div>
                <div className="col-md-6 col-12">
                  <StateInput stateInfo={userInfo} classes={classes} setStateInfo={setUserInfo} errors={errors} setErrors={setErrors} />
                </div>
                <div className={`col-md-6 col-12`}>
                  <label className="fs-5" htmlFor="nationaleId">
                    رقم الهوية
                  </label>
                  <input type="text" name="nationaleId" id="nationaleId" value={user.nationaleId} disabled
                    className={`${classes.input} form-control border border-secondary shadow-none`} />
                  <p className={`${classes.error} text-danger`}>{errors.nationaleIdErrors}</p>
                </div>
              </>
            }
          </div>
          <div className="row d-flex justify-content-center">
            <input type="submit" value="تحديث"
              className={
                Object.values(errors).some((error) => error !== "")
                  ? `text-center bgColor w-50 text-white btn my-3 ${classes.formBtn} disabled`
                  : `text-center bgColor w-50 text-white btn my-3 ${classes.formBtn}`}
              disabled={Object.values(userInfo).some((userInfo) => userInfo == "")}
            />
          </div>
        </div>
      </form>
    </>
  );
}
