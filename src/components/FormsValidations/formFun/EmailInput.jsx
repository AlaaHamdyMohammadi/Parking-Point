/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

export default function EmailInput({
  classes,
  setEmailInfo,
  emailInfo,
  errors,
  setErrors,
  disabled,
}) {
  const token = useSelector((state) => state.loggedIn.token);
  let emailRegx = /^[a-zA-Z0-9]{4,15}(@)(gmail|yahoo|outlook)(.com)$/;
  const emailValidation = (event) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      emailErrors:
        value.length === 0
          ? "يجب ادخال البريد الاليكتروني"
          : emailRegx.test(value)
          ? ""
          : "يجب ادخال بريد اليكتروني صحيح",
    });
    if (!token) {
      setEmailInfo({ ...emailInfo, [name]: value });
    }
  };
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="email" className="mb-1 fs-5">
          البريد الإلكتروني
        </label>
        <input
          type={`text`}
          className={` ${classes.input}  form-control border border-secondary shadow-none `}
          id="email"
          name="email"
          value={emailInfo.email}
          onChange={emailValidation}
          disabled={disabled}
        />
        <p className={`${classes.error} text-danger`}>{errors.emailErrors} </p>
      </div>
    </>
  );
}
