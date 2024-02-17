import { Link } from "react-router-dom";
import classes from "./../../styles/formStyles.module.css";
import { useState } from "react";
export default function LoginForm() {
    const [logInUser, setLogInUser] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        emailErrors: "",
        passwordErrors: "",
    })
    return (
        <>
            <form action="" className="fs-4 mb-5">
                <div>
                    <label htmlFor="username" className="fs-5">اسم المستخدم</label>
                    <input type="text" id="username" className={`${classes.input} form-control border-secondary shadow-none`}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="fs-5">كلمة السر</label>
                    <input type="text" id="password" className={`${classes.input} form-control border-secondary shadow-none`}/>
                </div>
                <input type="submit" value="submit" className={`${classes.formBtn} text-center bgColor text-white btn mt-5`}/>
            </form>
            <Link to={``} className={`mt-5`}>نسيت كلمه السر ؟</Link>
        </>
    );
}