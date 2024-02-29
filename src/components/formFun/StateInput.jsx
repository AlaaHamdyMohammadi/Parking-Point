
export default function StateInput({ classes, setStateInfo, stateInfo, errors, setErrors, role }) {
    let stateRegx = /^(مسقط)$/;
    const stateValidation = (event) => {
        const { name, value } = event.target
        // if (role === "renter") {
            setErrors({
                ...errors,
                stateErrors: value.length === 0 ? "يجب ادخال المحافظه" : stateRegx.test(value) ? "" : "المحافظه المتاحة مسقط قفط",
            });
            setStateInfo({ ...stateInfo, [name]: value });
        }
    // }
    return (
        <>
            <label className="fs-5" htmlFor="state">
                المحافظه
            </label>
            <input type="text" name="state" id="state" value={stateInfo.state} disabled
                className={`${classes.input} form-control border border-secondary shadow-none`}
                onChange={stateValidation}
                onBlur={stateValidation} />
            <p className={`${classes.error} text-danger`}>{errors.stateErrors}</p>
        </>
    )
}
