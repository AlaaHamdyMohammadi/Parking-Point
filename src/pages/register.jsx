import { useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import park from "./../../public/animation/Animation - 1706863019563.json";
import classes from "./../styles/register.module.css";

import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -600 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 600, // Register form sliding positions
  });

  const loginBtnProps = useSpring({
    backgroundColor: registrationFormStatus ? "#fff" : "#5e065f", //Animate bottom border of login button
    color: registrationFormStatus ? "#000" : "#fff", //Animate bottom border of register button
  });
  const registerBtnProps = useSpring({
    backgroundColor: registrationFormStatus ? "#5e065f" : "#fff", //Animate bottom border of register button
    color: registrationFormStatus ? "#fff" : "#000", //Animate bottom border of register button
  });
  const isLog = useSelector((state) => state.isLog.isLog);
  useEffect(() => {
    setRegistartionFormStatus(isLog);
  }, []);

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
      <form action="" className={`d-flex bgColor flex-row`} style={{ height: "67vw" }}>
      <div className={`col-12 `}>
        <div className={`col-9 ${classes.img}`}>
          <img className="w-100 " style={{ height: "67vw" }} src="./images/Rectangle4.png" alt="" />
        </div>
        <div className={`${classes.loginRegisterWrapper}`}>
          {/* <Lottie className="lottipark" animationData={park} loop={true} /> */}
          <div className=" mb-5 d-flex gap-4 fs-1 ">
            <animated.div className={`${classes.btnregister} mt-5`} onClick={registerClicked} id="registerBtn" style={registerBtnProps}>
              إنشاء حساب
            </animated.div>
            <animated.div className={`${classes.btnregister} mt-5`} onClick={loginClicked} id="loginBtn" style={loginBtnProps}>
              تسجيل الدخول
            </animated.div>
          </div>
          <div className="d-flex flex-column ">
            <div className="form-group row">
              {registrationFormStatus?"":
              <animated.form action="" id="loginform" className={`col-12`} style={loginProps}>
                <LoginForm />
              </animated.form>
              }
              {registrationFormStatus?
              <animated.form action="" id="registerform" className={`col-12`} style={registerProps}>
              <RegisterForm />
            </animated.form>:""
              }
            </div>
            {/* <animated.div className={`${classes.forgotPanel}`} style={loginProps}>
            </animated.div> */}
          </div>

          {/* </div> */}
        </div>

        <div className={`${classes.imgregister}`}>
          <div className="d-flex flex-column row-gap-3 ">
            <div className="align-self-end">
              <Link to={`/`} href="#">
                <img className={`${classes.logo}`} src="/images/logo3.png" alt="" />
              </Link>
            </div>
            <div className="align-self-end">{/* <h2>اركن ف اقرب موقف لك الان....</h2> */}</div>
            <div className="align-self-end d-md-block d-none">
              <img style={{ width: "40vw" }} src="/images/animate2.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      </form>
  );
}
export default Register;
