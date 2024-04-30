/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";


export default function NameLastInputs({
  classes,
  setLastNameInfo,
  lastNameInfo,
  errors,
  setErrors,
}) {
  let nameRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
    const { t } = useTranslation();

  const lastNameValidation = (event) => {
    const { name, value } = event.target;
    // if (name === "firstName") {
    //     setErrors({
    //       ...errors,
    //       fristNameErrors:
    //         value.length === 0 ? "يجب ادخال الاسم الاول" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
    //     });
    //   }
    if (name === "lastName") {
      setErrors({
        ...errors,
        lastNameErrors:
          value.length === 0
            ? t("LastName1")
            : nameRegx.test(value)
            ? ""
            : t("registerErr2"),
      });
    }
    setLastNameInfo({ ...lastNameInfo, [name]: value });
  };
  return (
    <>
      <div className="form-group mb-3 w-100">
        <label className="fs-5 mb-1" htmlFor="lastName">
          {t("LastName2")}
        </label>
        <input
          className={`${classes.input}  form-control border-secondary shadow-none`}
          type="text"
          name="lastName"
          value={lastNameInfo.lastName}
          id="lastName"
          onChange={lastNameValidation}
          onBlur={lastNameValidation}
        />
        <p className={`${classes.error} text-danger`}>
          {errors.lastNameErrors}
        </p>
      </div>
    </>
  );
}
