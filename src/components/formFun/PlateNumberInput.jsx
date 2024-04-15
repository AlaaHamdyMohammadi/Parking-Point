
export default function PlateNumberInput({ classes, setPlateNumberInfo, plateNumberInfo, errors, setErrors }) {
    let plateNumberRegx = /^[0-9]{1,5}[a-z]{1,2}$/;
    const plateNumberValidation = (event) => {
        const { name, value } = event.target
        // if (role === "driver") {
            setErrors({
                ...errors,
                plateNumberErrors:
                    value.length === 0 ? "يجب رقم لوحة السيارة" : plateNumberRegx.test(value) ? "" : "يجب ادخال رقم لوحة صحيح",
            });
        // }
        setPlateNumberInfo({ ...plateNumberInfo, [name]: value });
    }
    return (
        <>
            <label className="fs-5 mb-1" htmlFor="plateNumber">
                رقم اللوحة
            </label>
            <input type="text" name="plateNumber" id="plateNumber" value={plateNumberInfo.plateNumber}
                className={`${classes.input} Gray form-control border border-secondary shadow-none`}
                onChange={plateNumberValidation}
                onBlur={plateNumberValidation} />
            <p className={`${classes.error} text-danger`}>{errors.plateNumberErrors}</p>
        </>
    )
}
