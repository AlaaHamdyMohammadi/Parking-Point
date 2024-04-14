
export default function NameLastInputs({ classes, setNameInfo, nameInfo, errors, setErrors }) {
    let nameRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
    const nameValidation = (event) => {
        const { name, value } = event.target
        if (name === "firstName") {
            setErrors({
              ...errors,
              fristNameErrors:
                value.length === 0 ? "يجب ادخال الاسم الاول" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
            });
          }
          if (name === "lastName") {
            setErrors({
              ...errors,
              lastNameErrors:
                value.length === 0 ? "يجب ادخال الاسم الاخير" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
            });
          }
          setNameInfo({ ...nameInfo, [name]: value });
    }
    return (
        <>
       
                <div className="form-group mb-3 w-100">
                    <label className="fs-5 mb-1" htmlFor="lastName">
                        الأسم الاخير
                    </label>
                    <input
                        className={`${classes.input} Gray form-control border-secondary shadow-none`}
                        type="text"
                        name="lastName" value={nameInfo.lastName}
                        id="lastName"
                        onChange={nameValidation}
                        onBlur={nameValidation}
                    />
                    <p className={`${classes.error} text-danger`}>{errors.lastNameErrors}</p>
                </div>
        </>
    )
}
