/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";


export default function NameInputs({
  classes,
  setNameInfo,
  nameInfo,
  errors,
  setErrors,
}) {
  let nameRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
  const { t } = useTranslation();
  const nameValidation = (event) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      fristNameErrors:
        value.length === 0
          ? t("NameInp1")
          : nameRegx.test(value)
          ? ""
          : t("registerErr2"),
    });
    setNameInfo({ ...nameInfo, [name]: value });
  };
  return (
    <>
      <div className="form-group mb-3 w-100">
        <label className="fs-5 mb-1" htmlFor="firstName">
          {t("NameInp2")}
        </label>
        <input
          type="text"
          name="firstName"
          value={nameInfo.firstName}
          className={`${classes.input} form-control  border-secondary  shadow-none`}
          id="firstName"
          onChange={nameValidation}
          onBlur={nameValidation}
        />
        <p className={`${classes.error} text-danger`}>
          {errors.fristNameErrors}
        </p>
      </div>
    </>
  );
}
