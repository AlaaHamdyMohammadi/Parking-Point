/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

export default function PhoneInput({
  classes,
  setPhoneNumberInfo,
  phoneNumberInfo,
  errors,
  setErrors,
}) {
  let phoneRegx = /^(?:(?:\+|00)968)?(9[1-9]\d{6})$/;
    const { t } = useTranslation();

  const phoneNumberValidation = (event) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      phoneNumberErrors:
        value.length === 0
          ? t("phoneInp1")
          : phoneRegx.test(value)
          ? ""
          : t("phoneInp2"),
    });
    setPhoneNumberInfo({ ...phoneNumberInfo, [name]: value });
  };
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="email" className="mb-1 fs-5">
          {t("registerMobile")}
        </label>
        <input
          type={`text`}
          className={` ${classes.input}  form-control border border-secondary shadow-none `}
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumberInfo.phoneNumber}
          onChange={phoneNumberValidation}
        />
        <p className={`${classes.error} text-danger`}>
          {errors.phoneNumberErrors}{" "}
        </p>
      </div>
    </>
  );
}
