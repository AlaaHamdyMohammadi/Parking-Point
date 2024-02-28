
export default function CarTypeInput({ classes, setCarTypeInfo, carTypeInfo, errors, setErrors, role }) {
    let carTypeRegx = /^(سيارة)$/;
    const plateNumberValidation = (event) => {
        const { name, value } = event.target
        if (role === "driver") {
            setErrors({
                ...errors,
                carTypeErrors: value === "" ? "يجب اختيار نوع السيارة" : carTypeRegx.test(value) ? "" : "النوع سيارة فقط",
            });
        }
        setCarTypeInfo({ ...carTypeInfo, [name]: value });
    }
    return (
        <>
            <label className="fs-5" htmlFor="plateNumber">
                نوع المركبة
            </label>
            <input type="text" name="plateNumber" id="plateNumber" value={carTypeInfo.carType}
                className={`${classes.input} form-control border border-secondary shadow-none`}
                onChange={plateNumberValidation}
                onBlur={plateNumberValidation} disabled />
            <p className={`${classes.error} text-danger`}>{errors.carTypeErrors}</p>
        </>
    )
}
