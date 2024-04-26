import { useEffect, useState } from "react";
import classes from "./../styles/register.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/login-register/LoginForm";
import RegisterForm from "../components/login-register/RegisterForm";
import SpinnerLoad from "../components/spinner/Spinner";
import { Helmet } from "react-helmet";
function Register() {
  const [showFormStatus, setShowFormStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLog = useSelector((state) => state.isLog.isLog);
  useEffect(() => {
    setShowFormStatus(isLog);
  }, []);

  function registerClicked() {
    setShowFormStatus(true);
  }
  function loginClicked() {
    setShowFormStatus(false);
  }
  useEffect(function () {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Helmet>
        <title>Parking Point |  تسجيل الدخول</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <div  className={`${classes.bg}`}>
          <div className={`container pt-2`}>
            <div className={`row`}>
              <div className={`col-9 col-md-11`}></div>
              <div className={`col-3 col-md-1`}>
                <Link to={`/`} className={``}>
                  <img className={`w-100`} src="/images/logo3.png" alt="" />
                </Link>
              </div>
            </div>
            <div className={`row`}>
              <div className={`col-12 col-md-7`}>
                <div className="mb-5 d-flex">
                  <div
                    className={`${classes.loginBtn} bgColor text-white btn ms-5`}
                    onClick={registerClicked}
                  >
                    إنشاء حساب
                  </div>
                  <div
                    className={`${classes.loginBtn} bgColor text-white btn`}
                    onClick={loginClicked}
                  >
                    تسجيل الدخول
                  </div>
                </div>
                <div className="col-md-7 col-12">
                  {showFormStatus ? (
                    <div className={`w-100`}>
                      <RegisterForm setShowFormStatus={setShowFormStatus} />
                    </div>
                  ) : (
                    <div className={`w-100`}>
                      <LoginForm />
                    </div>
                  )}
                </div>
              </div>

              <div className={`col-5 d-md-block d-none mt-5`}>
                <img src="/images/animate2.svg" alt="" className="w-100 mt-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Register;
