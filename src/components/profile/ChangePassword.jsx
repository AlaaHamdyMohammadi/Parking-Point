import { useState } from "react"
import classes from "./../../styles/formStyles.module.css";
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [errors, setErrors] = useState({
        oldPasswordErrors: "*",
        newPasswordErrors: "*",
        confirmPasswordErrors: "*"
    });
    console.log(newPassword);
    console.log(confirmPassword);
    const changPasswordValidation = (event) => {
        const { name, value } = event.target;
        if (name === "oldPassword") {
            setErrors({ ...errors, oldPasswordErrors: value.length === 0 ? "ادخل رقمك السري القديم" : "" });
            setOldPassword(value);
        }
        if (name === "newPassword") {
            setErrors({ ...errors, newPasswordErrors: value.length === 0 ? "ادخل رقمك السري الجديد" : "" });
            setNewPassword(value);
        }
        if (name === "confirmPassword") {
            setErrors({
                ...errors, confirmPasswordErrors:
                    value.length === 0 ? "يجب تاكيد الرقم السري" : value == newPassword ? "" : "الرقم غير صحيح",
            });
            setConfirmPassword(value);
        }
    }
    return (
        <main>
            <form method="post" className="pe-5">
            <div className="col-md-5">
                <label className="fs-5" htmlFor="oldPassword">
                    كلمة السر القديمة
                </label>
                <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    className={`${classes.input} form-control border-secondary shadow-none`}
                    onChange={changPasswordValidation}
                    onBlur={changPasswordValidation}
                />
                <p className={`${classes.error} text-danger`}>{errors.oldPasswordErrors}</p>
            </div>
            <div className="col-md-5">
                <label className="fs-5" htmlFor="newPassword">
                    كلمة السر الجديدة
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className={`${classes.input} form-control border-secondary shadow-none`}
                    onChange={changPasswordValidation}
                    onBlur={changPasswordValidation}
                />
                <p className={`${classes.error} text-danger`}>{errors.newPasswordErrors}</p>
            </div>
            <div className="col-md-5">
                <label className="fs-5" htmlFor="confirmPassword">
                    تأكيد كلمه السر
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`${classes.input} form-control border-secondary shadow-none`}
                    onChange={changPasswordValidation}
                    onBlur={changPasswordValidation}
                />
                <p className={`${classes.error} text-danger`}>{errors.confirmPasswordErrors}</p>
            </div>
            </form>
        </main>
    )
}
