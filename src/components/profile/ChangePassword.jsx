import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
export default function ChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPasswordErrors: "*",
    passwordErrors: "*",
    confirmPasswordErrors: "*",
  });

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibilityCurrent = () => {
    setShowPasswordCurrent(!showPasswordCurrent);
  };
  const togglePasswordVisibilityNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  let passwordRegx = /^[a-zA-Z0-9]{8,}$/;
  const changPasswordValidation = (event) => {
    const { name, value } = event.target;
    if (name === "currentPassword") {
      setErrors({
        ...errors,
        currentPasswordErrors:
          value.length === 0 ? t("editProfile.oldPasswordErr") : "",
      });
      setCurrentPassword(value);
    }
    if (name === "password") {
      setErrors({
        ...errors,
        passwordErrors:
          value.length === 0
            ? t("editProfile.newPasswordErr1")
            : value.length <= 7
            ? t("editProfile.newPasswordErr2")
            : passwordRegx.test(value)
            ? ""
            : t("editProfile.newPasswordErr3"),
      });
      setpassword(value);
    }
    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPasswordErrors:
          value.length === 0
            ? t("editProfile.confirmPasswordErr1")
            : value == password
            ? ""
            : t("editProfile.confirmPasswordErr2"),
      });
      setConfirmPassword(value);
    }
  };
  const handleSubmit = async (event) => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      event.preventDefault();
    } else {
      event.preventDefault();
      const obj = {
        currentPassword: currentPassword,
        password: password,
        confirmPassword: confirmPassword,
      };
      try {
        await axiosInstanceParking.patch(`/users/me/change-password`, obj);
        toast.success(t("editProfile.successToastPass"));
        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      } catch (error) {
        toast.error(t("editProfile.errorToastPass"));
      }
    }
  };
  const language = useSelector((state) => state.language.language);

  return (
    <main>
      <form
        method="post"
        className="pe-5"
        onSubmit={handleSubmit}
        style={{
          ...(language === "ar" ? "" : { paddingLeft: "40px" }),
        }}
      >
        <div className="d-md-flex">
          <div className="col-12 col-md-6">
            <div>
              <label className="fs-5 py-1" htmlFor="currentPassword">
                {t("editProfile.oldPassword")}
              </label>
              <div className="d-flex justify-content-end">
                <div className="d-flex flex-column w-100">
                  <input
                    type={showPasswordCurrent ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    className={`${classes.input} form-control border-secondary shadow-none`}
                    onChange={changPasswordValidation}
                    onBlur={changPasswordValidation}
                  />
                  <p className={`${classes.error} text-danger`}>
                    {errors.currentPasswordErrors}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn Gray border-0"
                  style={{ position: "absolute", zIndex: "1" }}
                  onClick={togglePasswordVisibilityCurrent}
                >
                  {showPasswordCurrent ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <div>
              <label className="fs-5  py-1" htmlFor="password">
                {t("editProfile.newPassword")}
              </label>
              <div className="d-flex justify-content-end">
                <div className="d-flex flex-column w-100">
                  <input
                    type={showPasswordNew ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`${classes.input} form-control border-secondary shadow-none`}
                    onChange={changPasswordValidation}
                    onBlur={changPasswordValidation}
                  />
                  <p className={`${classes.error} text-danger`}>
                    {errors.passwordErrors}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn Gray border-0"
                  style={{ position: "absolute", zIndex: "1" }}
                  onClick={togglePasswordVisibilityNew}
                >
                  {showPasswordNew ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <div>
              <label className="fs-5  py-1" htmlFor="confirmPassword">
                {t("editProfile.confirmPassword")}
              </label>
              <div className="d-flex justify-content-end">
                <div className="d-flex flex-column w-100">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`${classes.input} w-100 form-control border-secondary shadow-none`}
                    onChange={changPasswordValidation}
                    onBlur={changPasswordValidation}
                  />
                  <p className={`${classes.error} text-danger`}>
                    {errors.confirmPasswordErrors}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn Gray border-0"
                  style={{ position: "absolute", zIndex: "1" }}
                  onClick={togglePasswordVisibilityConfirm}
                >
                  {showPasswordConfirm ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
          <div className="col-6 text-center  d-none d-md-block">
            <img
              style={{ width: "50vh", height: "50vh" }}
              className="h-70 w-0"
              src="/images/Reset password-amico (1).png"
            />
          </div>
        </div>
        <input
          type="submit"
          value={t("editProfile.submitPass")}
          className={`text-center bgColor w-75 w-md-25 text-white btn my-3  ${classes.formBtn}`}
          disabled={Object.values(errors).some((error) => error !== "")}
          // style={{
          //   ...(language === "ar" ? "" : { paddingLeft: "40px" }),
          // }}
        />
      </form>
    </main>
  );
}
