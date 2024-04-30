/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

export default function CitySelect({
  cityInfo,
  classes,
  setCityInfo,
  errors,
  setErrors,
}) {
  let cityRegx = /^(مسقط|مطرح|السيب|بوشر|العامرات|قريات)$/;
    const { t } = useTranslation();

  const cityValidation = (event) => {
    const { name, value } = event.target;
    // if (role === "renter") {
    setErrors({
      ...errors,
      cityErrors:
        value.length === 0
          ? t("cityInp1")
          : cityRegx.test(value)
          ? ""
          : t("cityInp2"),
    });
    // }
    setCityInfo({ ...cityInfo, [name]: value });
  };
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="city">
        {t("registerCity")}
      </label>
      <select
        id="city"
        name="city"
        value={cityInfo.city}
        className={`${classes.input}  form-control   border-secondary shadow-none`}
        onChange={cityValidation}
        onBlur={cityValidation}
      >
        <option className="" value={` `} selected hidden>
          {t("registerCity1")}
        </option>
        <option className="text-black" value="مسقط">
          {t("city1")}
        </option>
        <option className="text-black" value="مطرح">
          {t("city2")}
        </option>
        <option className="text-black" value="السيب">
          {t("city3")}
        </option>
        <option className="text-black" value="بوشر">
          {t("city4")}
        </option>
        <option className="text-black" value="العامرات">
          {t("city5")}
        </option>
        <option className="text-black" value="قريات">
          {t("city6")}
        </option>
      </select>
      <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
    </>
  );
}
