/* eslint-disable react/prop-types */

export default function PhoneInput({
  classes,
  setPhoneNumberInfo,
  phoneNumberInfo,
  errors,
  setErrors,
}) {
  let phoneRegx = /^(?:(?:\+|00)968)?(9[1-9]\d{6})$/;
  const phoneNumberValidation = (event) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      phoneNumberErrors:
        value.length === 0
          ? "يجب ادخال رقم الجوال"
          : phoneRegx.test(value)
          ? ""
          : "يجب ادخال رقم جوال صحيح",
    });
    setPhoneNumberInfo({ ...phoneNumberInfo, [name]: value });
  };
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="email" className="mb-1 fs-5">
          رقم الهاتف
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
