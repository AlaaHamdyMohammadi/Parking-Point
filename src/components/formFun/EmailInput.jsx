
export default function EmailInput({ classes, setEmailInfo, emailInfo, errors, setErrors }) {
    let emailRegx = /^[a-zA-Z0-9]{4,15}(@)(gmail|yahoo|outlook)(.com)$/;
    const emailValidation = (event) => {
        const { name, value } = event.target
        setErrors({
            ...errors,
            emailErrors:
                value.length === 0 ? "يجب ادخال البريد الاليكتروني" : emailRegx.test(value) ? "" : "يجب ادخال بريد اليكتروني صحيح",
        });
        setEmailInfo({ ...emailInfo, [name]: value });
    }
    return (
        <>
            <div className="form-group mb-3 w-100 ">
                <label htmlFor="email" className="mb-1 fs-5">البريد الإلكتروني</label>
                <input
                    type={`text`}
                    className={` ${classes.input} form-control border border-secondary shadow-none `}
                    id="email" name="email"
                    value={emailInfo.email}
                    onChange={emailValidation}
                />
                <p className={`${classes.error} text-danger`}>{errors.emailErrors} </p>
            </div>
        </>
    )
}
