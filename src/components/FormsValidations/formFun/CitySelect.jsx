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

// import { useTranslation } from "react-i18next";

// export default function CitySelect({
//   cityInfo,
//   classes,
//   setCityInfo,
//   errors,
//   setErrors,
// }) {
//   let cityRegx = /^(مسقط|مطرح|السيب|بوشر|العامرات|قريات)$/;
//   const cityValidation = (event) => {
//     const { name, value } = event.target;
//     // if (role === "renter") {
//     setErrors({
//       ...errors,
//       cityErrors:
//         value.length === 0
//           ? t('addParking.cityErr1')
//           : cityRegx.test(value)
//           ? ""
//           : t('addParking.cityErr2'),
//     });
//     // }
//     setCityInfo({ ...cityInfo, [name]: value });
//   };
//   const { t } = useTranslation();
//   return (
//     <>
//       <label className="fs-5 mb-1" htmlFor="city">
//       {t('addParking.city')}
//       </label>
//       <select
//         id="city"
//         name="city"
//         value={cityInfo.city}
//         className={`${classes.input}  form-control   border-secondary shadow-none`}
//         onChange={cityValidation}
//         onBlur={cityValidation}
//       >
//         <option className="" value={` `} selected hidden>
//         {t('addParking.SelectState')}
//         </option>
//         <option className="text-black" value="مسقط">
//         {t('addParking.city1')}
//         </option>
//         <option className="text-black" value="مطرح">
//         {t('addParking.city2')}
//         </option>
//         <option className="text-black" value="السيب">
//         {t('addParking.city3')}
//         </option>
//         <option className="text-black" value="بوشر">
//         {t('addParking.city4')}
//         </option>
//         <option className="text-black" value="العامرات">
//         {t('addParking.city5')}
//         </option>
//         <option className="text-black" value="قريات">
//         {t('addParking.city6')}
//         </option>
//       </select>
//       <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
//     </>
//   );
// }
// "capacityErr2": "سعة الموقف من 1 الي 10 فقط",
// "cityErr1": "يجب اختيار الولاية",
// "cityErr2": "يجب اختيار من واحد من الاختيارات المقدمة",
// "SelectState":"حدد الولاية",
// "city1":"مسقط",
// "city2":"مطرح",
// "city3":"السيب",
// "city4":"بوشر",
// "city5":"العامرات",
// "city6":"قريات",

// "cityErr1": "You must select the state",
// "cityErr2": "You must choose from one of the options provided",
// "SelectState":"Select the state",
// "city1":"Muscat",
// "city2":"Matrah",
// "city3":"Al-Seeb",
// "city4":"Busher",
// "city5":"Al-Amerat",
// "city6":"Qurayyat",