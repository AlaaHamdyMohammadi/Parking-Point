/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

export default function RegionInput({
  classes,
  setRegionInfo,
  regionInfo,
  errors,
  setErrors,
}) {
  let regionRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
  const { t } = useTranslation();
  const regionValidation = (event) => {
    const { name, value } = event.target;
    // if (role === "renter") {
    setErrors({
      ...errors,
      regionErrors:
        value.length === 0
          ? t("regionInp1")
          : regionRegx.test(value)
          ? ""
          : t("registerErr2"),
    });
    // }
    setRegionInfo({ ...regionInfo, [name]: value });
  };
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="region">
        {t('registerRegion')}
      </label>
      <input
        type="text"
        id="region"
        name="region"
        value={regionInfo.region}
        className={`${classes.input}  form-control border-secondary shadow-none`}
        onChange={regionValidation}
        onBlur={regionValidation}
      />
      <p className={`${classes.error} text-danger`}>{errors.regionErrors} </p>
    </>
  );
}
