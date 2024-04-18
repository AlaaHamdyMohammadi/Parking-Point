import { useState } from "react";
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
export default function ChangePassword() {
  const token = useSelector((state) => state.loggedIn.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const changPasswordValidation = (event) => {
    const { name, value } = event.target;
    if (name === "currentPassword") {
      setErrors({
        ...errors,
        currentPasswordErrors:
          value.length === 0 ? "ادخل رقمك السري القديم" : "",
      });
      setCurrentPassword(value);
    }
    if (name === "password") {
      setErrors({
        ...errors,
        passwordErrors: value.length === 0 ? "ادخل رقمك السري الجديد" : "",
      });
      setpassword(value);
    }
    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPasswordErrors:
          value.length === 0
            ? "يجب تاكيد الرقم السري"
            : value == password
            ? ""
            : "الرقم غير صحيح",
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
        await axiosInstanceParking.patch(`/users/me/change-password`, obj, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("لقد تم تغيير كلمة السر بنجاح  !");

        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      } catch (error) {
        toast.error("كلمة السر الحالية غير صحيحة");
        console.error("not login", error);
      }
    }
  };
  return (
    <main>
      <form method="post" className="pe-5" onSubmit={handleSubmit}>
        <div className="d-md-flex">
          <div className="col-12 col-md-6">
            <div className=" ">
              <label className="fs-5 py-1" htmlFor="currentPassword">
                كلمة السر القديمة
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
                {/* <button
              type="button"
              className="btn Gray border border-0"
              style={{ position: "absolute", zIndex: "1" }}
              onClick={togglePasswordVisibilityCurrent}
            >
              {showPasswordCurrent ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button> */}
              </div>
            </div>
            <div className="">
              <label className="fs-5  py-1" htmlFor="password">
                كلمة السر الجديدة
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
                  className="btn Gray border border-0"
                  style={{ position: "absolute", zIndex: "1" }}
                  onClick={togglePasswordVisibilityNew}
                >
                  {showPasswordNew ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <div className="">
              <label className="fs-5  py-1" htmlFor="confirmPassword">
                تأكيد كلمه السر
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
                  className="btn Gray border border-0"
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
              src="./../../../public/images/Reset password-amico (1).png"
            />
          </div>
        </div>

        <input
          type="submit"
          value="تاكيد"
          className={`text-center bgColor w-25 text-white btn my-3 ${classes.formBtn}`}
          disabled={Object.values(errors).some((error) => error !== "")}
        />
      </form>
    </main>
  );
}
