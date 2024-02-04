import React, { useEffect, useState } from "react";
import "./register.css";
// import Lottie from "lottie-react";
// import park from "./../../public/animation/Animation - 1706863019563.json";
import classes from "./../styles/register.module.css";

import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -600 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 600, // Register form sliding positions
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus ? "solid 0px transparent" : "solid 3px #5e065f", //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus ? "solid 3px #5e065f" : "solid 0px transparent", //Animate bottom border of register button
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
    <div className="d-flex  bgColor flex-row ">
      <div className={`col-12 `}>
        <div className={`col-9 ${classes.img} `}>
          <img className="w-100 " style={{ height: "80vw" }} src="./images/Rectangle4.png" alt="" />
        </div>
        <div className="login-register-wrapper ">
          {/* <Lottie className="lottipark" animationData={park} loop={true} /> */}
          <div className=" mb-5 d-flex gap-4 fs-1 ">
            <animated.div className={`btnregister my-5`} onClick={registerClicked} id="registerBtn" style={registerBtnProps}>
              إنشاء حساب
            </animated.div>
            <animated.div className={`btnregister my-5`} onClick={loginClicked} id="loginBtn" style={loginBtnProps}>
              تسجيل الدخول
            </animated.div>
          </div>
          <div className="d-flex flex-column ">
            <div className="form-group">
              <animated.form action="" id="loginform" style={loginProps}>
                <LoginForm />
              </animated.form>
              <animated.form action="" id="registerform" style={registerProps}>
                <RegisterForm />
              </animated.form>
            </div>
            <animated.div className="forgot-panel" style={loginProps}>
              <Link to={``}>نسيت كلمه السر ؟</Link>
            </animated.div>
          </div>

          {/* </div> */}
        </div>

        <div className="imgregister ">
          <div className="d-flex flex-column   row-gap-3 ">
            <div className="align-self-end">
              <Link to={`/`} href="#">
                <img style={{ height: "8rem", width: "8rem" }} src="/images/logo3.png" alt="" />
              </Link>
            </div>
            <div className="align-self-end">{/* <h2>اركن ف اقرب موقف لك الان....</h2> */}</div>
            <div className="align-self-end">
              <img style={{ height: "40rem" }} src="/images/animate2.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <React.Fragment>
      <div className="fs-4 fw-semibold">
        <label htmlFor="username">اسم المستخدم</label>
        <input type="text" id="username" />
        <label htmlFor="password">كلمة السر</label>
        <input type="text" id="password" />
        <input type="submit" value="submit" className="submit" />
      </div>
    </React.Fragment>
  );
}

function RegisterForm() {
  const [isDriver, setIsDriver] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const displayIsDriver = (event) => {
    if (event.target.checked == true) {
      setIsDriver(true);
      setIsOwner(false);
    }
  };
  const displayIsOwner = (event) => {
    if (event.target.checked == true) {
      setIsDriver(false);
      setIsOwner(true);
    }
  };
  return (
    <React.Fragment>
      <div className="fs-4 fw-semibold">
        <div className={`d-flex gap-4`}>
          <div className="d-flex  flex-column">
            <label htmlFor="fullname ">الأسم الاول </label>
            <input type="text" className="inputcolor" id="fullname" />
          </div>
          <div className="d-flex   flex-column">
            <label htmlFor="lastlname">الأسم الاخير</label>
            <input className="inputcolor" type="text" id="lastname" />
          </div>
        </div>

        <label htmlFor="email">الايميل</label>
        <input type="email" id="email" />
        {/* <div className={`d-flex`}> */}
        <label htmlFor="password">كلمة السر</label>
        <input type="password" id="password" />
        <label htmlFor="confirmpassword">تأكيد كلمه السر</label>
        <input type="password" id="confirmpassword" />
        {/* </div> */}
        <label htmlFor="nummob">رقم الهاتف </label>
        <input type="number" id="nummob" />
        <div> نوع الحساب</div>
        <input
          type="radio"
          name="acctype"
          id="driver"
          value="driver"
          onChange={(eve) => {
            displayIsDriver(eve);
          }}
          className={`  inputFilter`}
        />
        <label className={`m-2 `} htmlFor="driver">
          سائق
        </label>
        <input
          type="radio"
          id="owner"
          name="acctype"
          value="owner"
          onChange={(eve) => {
            displayIsOwner(eve);
          }}
          className={` mt-4 inputFilter`}
        />
        <label className={`m-2 `} htmlFor="owner">
          صاحب موقف
        </label>
        {isDriver && (
          <>
            <div>
              <label htmlFor="numboard">رقم اللوحة</label>
              <input type="number" id="numboard" />
              <label htmlFor="cars">نوع المركبة</label>
              <select id="cars" name="cars">
                <option value="car">سيارة</option>
              </select>
              <input type="submit" value="submit" className="submit" />
            </div>
          </>
        )}
        {isOwner && (
          <>
            <div className={`d-flex`}>
              <label className={`mt-3 mx-2`} htmlFor="Governorate">
                {" "}
                المحافظه
              </label>
              <select className={`my-2`} id="cars" name="cars">
                <option value="masqt">مسقط</option>
              </select>

              <label className={`mt-3 mx-2`} htmlFor="Governorate">
                الولاية
              </label>
              <select className={`my-2`} id="cars" name="cars">
                <option value="masqt">مسقط</option>
                <option value="mtrh">مطرح</option>
                <option value="seeb">السيب</option>
                <option value="boshr">بوشر</option>
                <option value="amrat">العامرات</option>
                <option value="qryat">قريات</option>
              </select>
            </div>
            <label className={`mt-3`} htmlFor="area">
              المنطقه{" "}
            </label>
            <input type="text" id="area" />
            <input type="submit" value="submit" className="submit" />
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Register;
