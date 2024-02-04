import { Link } from "react-router-dom";
import classes from "./../styles/register.module.css";
export default function LoginForm() {
    return (
        <>
            <form action="" className="fs-4 fw-semibold mb-5">
                <div>
                <label htmlFor="username">اسم المستخدم</label>
                <input type="text" id="username" />
                </div>
                <div>
                <label htmlFor="password">كلمة السر</label>
                <input type="text" id="password" />
                </div>
                <input type="submit" value="submit" className={`${classes.submit}`} />
            </form>
            <Link to={``} className={`mt-5`}>نسيت كلمه السر ؟</Link>
        </>
    );
}