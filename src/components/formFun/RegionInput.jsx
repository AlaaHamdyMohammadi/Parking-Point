
export default function RegionInput({ classes, setRegionInfo, regionInfo, errors, setErrors, role }) {
    let regionRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
    const regionValidation = (event) => {
        const { name, value } = event.target
        if (role === "renter") {
            setErrors({
                ...errors,
                regionErrors:
                    value.length === 0 ? "يجب ادخال المنطقه" : regionRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
            });
        }
        setRegionInfo({ ...regionInfo, [name]: value });
    }
    return (
        <>
            <label className="fs-5" htmlFor="region">
                المنطقه
            </label>
            <input
                type="text"
                id="region"
                name="region"
                value={regionInfo.region}
                className={`${classes.input} form-control border-secondary shadow-none`}
                onChange={regionValidation}
                onBlur={regionValidation} />
            <p className={`${classes.error} text-danger`}>{errors.regionErrors} </p>
        </>
    )
}
