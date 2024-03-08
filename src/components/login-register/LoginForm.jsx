/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import classes from "./../../styles/formStyles.module.css";
import { useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTrueErrors, setIsTrueErrors] = useState("");
  const [logInUser, setLogInUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailErrors: "",
    passwordErrors: "",
  });
  const loginValidation = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setErrors({
        ...errors,
        emailErrors: value.length === 0 ? "ادخل البريد الاليكتروني" : "",
      });
    }
    if (name === "password") {
      setErrors({
        ...errors,
        passwordErrors: value.length === 0 ? "ادخل رقمك السري" : "",
      });
    }
    setLogInUser({ ...logInUser, [name]: value });
  };
  const handleSubmit = async (event) => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(logInUser).some(
      (logInUser) => logInUser === ""
    );
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      event.preventDefault();
      try {
        const res = await axiosInstanceParking.post(`/users/signin`, logInUser);
        const userData = res.data;
        dispatch(login(userData.token));
        navigate("/");
      } catch (error) {
        // setIsTrueErrors("من فضلك ادخل بيانات صحيحة");
        toast.error("من فضلك ادخل بيانات صحيحة");
        console.error("not login", error);
      }
    }
  };
  console.log(isTrueErrors);
  return (
    <>
      <form method="post" onSubmit={handleSubmit} className="fs-4 mb-5">
        <p className={`text-danger`}>{isTrueErrors}</p>
        <div>
          <label htmlFor="email" className="fs-5">
            اسم المستخدم
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${classes.input} form-control border-secondary shadow-none`}
            onChange={loginValidation}
            onBlur={loginValidation}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="fs-5">
            كلمة السر
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`${classes.input} form-control border-secondary shadow-none`}
            onChange={loginValidation}
            onBlur={loginValidation}
          />
        </div>
        <input
          type="submit"
          value="تسجيل الدخول"
          className={
            Object.values(errors).some((error) => error !== "")
              ? "btn bgColor text-white col-4 disabled"
              : "text-center bgColor text-white btn mt-5 "
          }
          disabled={Object.values(logInUser).some(
            (logInUser) => logInUser == ""
          )}
        />
      </form>
      <ToastContainer position="top-right" autoClose={50000} />
      <Link to={``} className={`mt-5`}>
        نسيت كلمه السر ؟
      </Link>
    </>
  );
}
