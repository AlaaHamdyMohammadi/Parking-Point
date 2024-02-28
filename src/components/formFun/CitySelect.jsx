
export default function CitySelect({ cityInfo, classes, setCityInfo, errors, setErrors, role }) {
    let cityRegx = /^(مسقط|مطرح|السيب|بوشر|العامرات|قريات)$/;
    const cityValidation = (event) => {
        const { name, value } = event.target
        if (role === "renter") {
            setErrors({
                ...errors,
                cityErrors:
                    value.length === 0
                        ? "يجب اختيار الولاية"
                        : cityRegx.test(value)
                            ? ""
                            : "يجب اختيار من واحد من الاختيارات المقدمة",
            });
        }
        setCityInfo({ ...cityInfo, [name]: value });
    }
    return (
        <>
                <label className="fs-5" htmlFor="city">
                    الولاية
                </label>
                <select
                    id="city"
                    name="city"
                    value={cityInfo.city}
                    className={`${classes.input} form-control border border-secondary shadow-none`}
                    onChange={cityValidation}
                    onBlur={cityValidation}>
                    <option value={` `} selected hidden>
                        حدد الولاية
                    </option>
                    <option value="مسقط">مسقط</option>
                    <option value="مطرح">مطرح</option>
                    <option value="السيب">السيب</option>
                    <option value="بوشر">بوشر</option>
                    <option value="العامرات">العامرات</option>
                    <option value="قريات">قريات</option>
                </select>
                <p className={`${classes.error} text-danger`}>{errors.cityErrors}</p>
        </>
    )
}
