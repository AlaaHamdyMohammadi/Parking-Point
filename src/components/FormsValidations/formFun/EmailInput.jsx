/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function EmailInput({
  classes,
  setEmailInfo,
  emailInfo,
  errors,
  setErrors,
  disabled,
}) {
  const token = useSelector((state) => state.loggedIn.token);
  const { t } = useTranslation();

  let emailRegx = /^[a-zA-Z0-9]{4,}(@)(gmail|yahoo|outlook)(.com)$/;
  const emailValidation = (event) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      emailErrors:
        value.length === 0
          ? t("emailInp1")
          : emailRegx.test(value)
          ? ""
          : t("emailInp2"),
    });
    if (!token) {
      setEmailInfo({ ...emailInfo, [name]: value });
    }
  };
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="email" className="mb-1 fs-5">
          {t("registerEmail")}
        </label>
        <input
          type={`text`}
          className={` ${classes.input}  form-control border border-secondary shadow-none `}
          id="email"
          name="email"
          value={emailInfo.email}
          onChange={emailValidation}
          onBlur={emailValidation}
          disabled={disabled}
        />
        <p className={`${classes.error} text-danger`}>{errors.emailErrors} </p>
      </div>
    </>
  );
}
