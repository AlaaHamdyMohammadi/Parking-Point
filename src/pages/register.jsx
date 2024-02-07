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





{/* function RegisterForm() {
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
            <input type="text" className={`${classes.inputcolor}`} id="fullname" />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="lastlname">الأسم الاخير</label>
            <input className={`${classes.inputcolor}`} type="text" id="lastname" />
          </div>
        </div>

        <label htmlFor="email">الايميل</label>
        <input type="email" id="email" />
        <label htmlFor="password">كلمة السر</label>
        <input type="password" id="password" />
        <label htmlFor="confirmpassword">تأكيد كلمه السر</label>
        <input type="password" id="confirmpassword" />
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
          className={`${classes.inputFilter}`}
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
          className={` mt-4 ${classes.inputFilter}`}
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
              <input type="submit" value="submit" className={`submit text-center rounded-2 fs-5 fw-bold mt-5`} />
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
            <input type="submit" value="submit" className={`submit text-center rounded-2 fs-5 fw-bold mt-5`} />
          </>
        )}
      </div>
    </React.Fragment>
  );
} */}