/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

export default function PlateNumberInput({
  classes,
  setPlateNumberInfo,
  plateNumberInfo,
  errors,
  setErrors,
}) {
  let plateNumberRegx = /^[0-9\u0600-\u06FF]{1,5}[a-z\u0600-\u06FF]{1,2}$/;
  const { t } = useTranslation();
  const plateNumberValidation = (event) => {
    const { name, value } = event.target;
    // if (role === "driver") {
    setErrors({
      ...errors,
      plateNumberErrors:
        value.length === 0
          ? t("plateInp1")
          : plateNumberRegx.test(value)
          ? ""
          : t("plateInp2"),
    });
    // }
    setPlateNumberInfo({ ...plateNumberInfo, [name]: value });
  };
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="plateNumber">
        {t("registerPlate")}
      </label>
      <input
        type="text"
        name="plateNumber"
        id="plateNumber"
        value={plateNumberInfo.plateNumber}
        className={`${classes.input}  form-control border border-secondary shadow-none`}
        onChange={plateNumberValidation}
        onBlur={plateNumberValidation}
      />
      <p className={`${classes.error} text-danger`}>
        {errors.plateNumberErrors}
      </p>
    </>
  );
}
