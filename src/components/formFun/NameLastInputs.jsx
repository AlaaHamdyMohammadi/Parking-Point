
export default function NameLastInputs({ classes, setLastNameInfo, lastNameInfo, errors, setErrors }) {
    let nameRegx = /^[A-Za-z0-9\u0600-\u06FF]{3,}$/;
    const lastNameValidation = (event) => {
        const { name, value } = event.target
        // if (name === "firstName") {
        //     setErrors({
        //       ...errors,
        //       fristNameErrors:
        //         value.length === 0 ? "يجب ادخال الاسم الاول" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
        //     });
        //   }
          // if (name === "lastName") {
            setErrors({
              ...errors,
              lastNameErrors:
                value.length === 0 ? "يجب ادخال الاسم الاخير" : nameRegx.test(value) ? "" : "يجب ادخال ثلاثة احرف بحد ادني",
            });
          // }
          setLastNameInfo({ ...lastNameInfo, [name]: value });
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
                        name="lastName" value={lastNameInfo.lastName}
                        id="lastName"
                        onChange={lastNameValidation}
                        onBlur={lastNameValidation}
                    />
                    <p className={`${classes.error} text-danger`}>{errors.lastNameErrors}</p>
                </div>
        </>
    )
}
