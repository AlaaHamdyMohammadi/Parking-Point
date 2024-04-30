/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

export default function StateInput({
  classes,
  setStateInfo,
  stateInfo,
  errors,
  setErrors,
}) {
  let stateRegx = /^(مسقط)$/;
  const { t } = useTranslation();
  const stateValidation = (event) => {
    const { name, value } = event.target;
    // if (role === "renter") {
    setErrors({
      ...errors,
      stateErrors:
        value.length === 0
          ? t("stateInp1")
          : stateRegx.test(value)
          ? ""
          : t('stateInp2'),
    });
    setStateInfo({ ...stateInfo, [name]: value });
  };
  // }
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="state">
        {t("registerState")}
      </label>
      <input
        type="text"
        name="state"
        id="state"
        value={stateInfo.state}
        disabled
        className={`${classes.input}  form-control border border-secondary shadow-none`}
        onChange={stateValidation}
        onBlur={stateValidation}
      />
      <p className={`${classes.error} text-danger`}>{errors.stateErrors}</p>
    </>
  );
}
