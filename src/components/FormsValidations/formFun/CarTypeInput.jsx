/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

export default function CarTypeInput({
  classes,
  setCarTypeInfo,
  carTypeInfo,
  errors,
  setErrors,
}) {
  let carTypeRegx = /^(سيارة)$/;
    const { t } = useTranslation();

  const plateNumberValidation = (event) => {
    const { name, value } = event.target;
    // if (role === "driver") {
    setErrors({
      ...errors,
      carTypeErrors:
        value === ""
          ? t("carInp1")
          : carTypeRegx.test(value)
          ? ""
          : t("carInp2"),
    });
    // }
    setCarTypeInfo({ ...carTypeInfo, [name]: value });
  };
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="plateNumber">
        {t("registerCar")}
      </label>
      <input
        type="text"
        name="plateNumber"
        id="plateNumber"
        value={t("registerCar1")}
        className={`${classes.input}  form-control border border-secondary shadow-none`}
        onChange={plateNumberValidation}
        onBlur={plateNumberValidation}
        disabled
      />
      <p className={`${classes.error} text-danger`}>{errors.carTypeErrors}</p>
    </>
  );
}
