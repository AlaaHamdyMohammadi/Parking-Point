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
  const isLog = useSelector((state) => state.isLog.isLog)
  useEffect(() => {
    setRegistartionFormStatus(isLog);
  }, [])
  
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
        <div className="imgregister d-flex">
          {/* <p>
            kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
          </p> */}
          {/*  */}
          {/* <img src="/images/parking-animate.svg" alt="" /> */}
          <img src="/images/animate2.svg" alt="" />

          {/* <svg>o;p;['jk9]\</svg> */}
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <React.Fragment>
      <div className="fs-4 fw-semibold">
        <label className={`mb-2`} htmlFor="username">
          اسم المستخدم
        </label>
        <input type="text" id="username" />
        <label className={`mb-2`} htmlFor="password">
          كلمة السر
        </label>
        <input type="text" id="password" />
        <input type="submit" value="submit" className="submit" />
      </div>
    </React.Fragment>
  );
}

function RegisterForm() {
  const [isDriver, setIsDriver] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
const displayIsDriver=(event)=>{
  if(event.target.checked==true){
    setIsDriver(true)
    setIsOwner(false)
  }
}
const displayIsOwner=(event)=>{
  if(event.target.checked==true){
    setIsDriver(false)
    setIsOwner(true)
  }
}
  return (
    <React.Fragment>
      <div className="fs-4 fw-semibold">
        <label htmlFor="fullname">الأسم الاول </label>
        <input type="text" id="fullname" />
        <label htmlFor="lastlname">الاسم الاخير</label>
        <input type="text" id="lastname" />

        <label htmlFor="email">الايميل</label>
        <input type="email" id="email" />
        <label htmlFor="password">كلمة السر</label>
        <input type="password" id="password" />
        <label htmlFor="confirmpassword">تأكيد كلمه السر</label>
        <input type="password" id="confirmpassword" />
        <label htmlFor="nummob">رقم الهاتف </label>
        <input type="number" id="nummob" />
        <div> نوع الحساب</div>
          <input type="radio" name="acctype" id="driver" value="driver" onChange={(eve)=>{displayIsDriver(eve)}} className={`me-2 inputFilter`}/>
        <label htmlFor="driver">
          سائق
        </label>
        <input type="radio" id="owner" name="acctype" value="owner" onChange={(eve)=>{displayIsOwner(eve)}} className={`me-2 inputFilter`}/>
        <label htmlFor="owner">
          صاحب موقف
        </label>
        <br />
{
  isDriver&&
  <>
  <label htmlFor="numboard">رقم اللوحة</label>
  <input type="number" id="numboard" />
  <label htmlFor="cars">نوع المركبة</label>
  <select id="cars" name="cars">
    <option value="volvo">سيارة</option>
  </select>
  <input type="submit" value="submit" className="submit" />
  </>
}
{
  isOwner&&
  <>
  <select id="cars" name="cars">
    <option value="volvo">id</option>
  </select>
  <input type="submit" value="submit" className="submit" />
  </>
}
      </div>
    </React.Fragment>
  );
}

export default Register;
