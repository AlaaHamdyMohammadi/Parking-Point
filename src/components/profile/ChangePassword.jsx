import { useState } from "react"
import classes from "./../../styles/formStyles.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
export default function ChangePassword() {
    const token = useSelector((state) => state.loggedIn.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({
        currentPasswordErrors: "*",
        passwordErrors: "*",
        confirmPasswordErrors: "*"
    });
    const changPasswordValidation = (event) => {
        const { name, value } = event.target;
        if (name === "currentPassword") {
            setErrors({ ...errors, currentPasswordErrors: value.length === 0 ? "ادخل رقمك السري القديم" : "" });
            setCurrentPassword(value);
        }
        if (name === "password") {
            setErrors({ ...errors, passwordErrors: value.length === 0 ? "ادخل رقمك السري الجديد" : "" });
            setpassword(value);
        }
        if (name === "confirmPassword") {
            setErrors({
                ...errors, confirmPasswordErrors:
                    value.length === 0 ? "يجب تاكيد الرقم السري" : value == password ? "" : "الرقم غير صحيح",
            });
            setConfirmPassword(value);
        }
    }
    const handleSubmit = async (event) => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) {
            event.preventDefault();
        } else {
            event.preventDefault();
            const obj = {
                currentPassword:currentPassword,
                password:password,
                confirmPassword:confirmPassword
            };
            try {
                await axiosInstanceParking.patch(`/users/me/changePassword`, obj, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Password changed please login again');
                dispatch(logout());
                navigate("/");
            } catch (error) {
                console.error("not login", error);
            }
        }
    }
    return (
        <main>
            <form method="post" className="pe-5" onSubmit={handleSubmit}>
                <div className="col-md-5">
                    <label className="fs-5" htmlFor="currentPassword">
                        كلمة السر القديمة
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className={`${classes.input} form-control border-secondary shadow-none`}
                        onChange={changPasswordValidation}
                        onBlur={changPasswordValidation}
                    />
                    <p className={`${classes.error} text-danger`}>{errors.currentPasswordErrors}</p>
                </div>
                <div className="col-md-5">
                    <label className="fs-5" htmlFor="password">
                        كلمة السر الجديدة
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`${classes.input} form-control border-secondary shadow-none`}
                        onChange={changPasswordValidation}
                        onBlur={changPasswordValidation}
                    />
                    <p className={`${classes.error} text-danger`}>{errors.passwordErrors}</p>
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
                <input type="submit" value="تاكيد"
                    className={`text-center bgColor w-25 text-white btn my-3 ${classes.formBtn}`}
                    disabled={Object.values(errors).some((error) => error !== "")} />
            </form>
        </main>
    )
}
