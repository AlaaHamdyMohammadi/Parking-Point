/* eslint-disable react/prop-types */

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
          ? "يجب اختيار الولاية"
          : cityRegx.test(value)
          ? ""
          : "يجب اختيار من واحد من الاختيارات المقدمة",
    });
    // }
    setCityInfo({ ...cityInfo, [name]: value });
  };
  return (
    <>
      <label className="fs-5 mb-1" htmlFor="city">
        الولاية
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
          حدد الولاية
        </option>
        <option className="text-black" value="مسقط">
          مسقط
        </option>
        <option className="text-black" value="مطرح">
          مطرح
        </option>
        <option className="text-black" value="السيب">
          السيب
        </option>
        <option className="text-black" value="بوشر">
          بوشر
        </option>
        <option className="text-black" value="العامرات">
          العامرات
        </option>
        <option className="text-black" value="قريات">
          قريات
        </option>
      </select>
      <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
    </>
  );
}
