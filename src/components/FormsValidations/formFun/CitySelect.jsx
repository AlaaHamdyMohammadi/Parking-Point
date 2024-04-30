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
  const cityValidation = (event) => {
    const { name, value } = event.target;
    // if (role === "renter") {
    setErrors({
      ...errors,
      cityErrors:
        value.length === 0
          ? t('addParking.cityErr1')
          : cityRegx.test(value)
          ? ""
          : t('addParking.cityErr2'),
    });
    // }
    setCityInfo({ ...cityInfo, [name]: value });
  };
  const { t } = useTranslation();
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="city">
      {t('addParking.city')}
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
        {t('addParking.SelectState')}
        </option>
        <option className="text-black" value="مسقط">
        {t('addParking.city1')}
        </option>
        <option className="text-black" value="مطرح">
        {t('addParking.city2')}
        </option>
        <option className="text-black" value="السيب">
        {t('addParking.city3')}
        </option>
        <option className="text-black" value="بوشر">
        {t('addParking.city4')}
        </option>
        <option className="text-black" value="العامرات">
        {t('addParking.city5')}
        </option>
        <option className="text-black" value="قريات">
        {t('addParking.city6')}
        </option>
      </select>
      <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
    </>
  );
}


