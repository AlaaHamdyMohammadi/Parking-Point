/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./../../styles/header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changLog } from "../../store/slices/login";
import { IoPerson } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { logout } from "../../store/slices/authSlice";
import axiosInstanceParking from "../../axiosConfig/instanc";
import useLogInUserData from "../../../hook/useLogInUserData";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import ConfimEmailPop from "../login-register/confirmEmailpop";
import useSendCode from "../../../hook/useSendCode";
import LangaugeSwitch from "./LangaugeSwitch";

export default function Header() {
  const user = useLogInUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
  const displayRegester = () => {
    dispatch(changLog(true));
  };
  const displayLogin = () => {
    dispatch(changLog(false));
  };
  const logdedout = async () => {
    dispatch(logout());
    const res = await axiosInstanceParking.post(`/users/logout`);
    console.log(res);
    navigate("/");
  };
  const handleChange = useSendCode();


  return (
    <main>
      <div className="navColor p-1 shadow">
        <nav
          className={`container d-flex navbar navbar-expand-lg justify-content-between `}>
          <button className="navbar-toggler navbar-dark text-body-tertiary"
            type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {isLoggedIn ? (
            <div className="position-relative d-flex justify-content-center align-items-center col-1">
              <div className="btn-group border-0">
                <button
                  type="button"
                  className="   navcolor fs-5 border-0 text-white dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">
                  <div className="  text-end">
                    <li>
                      <Link to={`/Profile/sales`} className="dropdown-item">
                        <span className="ps-2">
                          <LiaMoneyCheckAltSolid />
                        </span>
                        حجوزاتي
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/Profile/editOwnerProfile`}
                        className="dropdown-item"
                      >
                        <span className="ps-2">
                          <IoPerson />
                        </span>
                        إدارة حسابي
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="mailto:parkingpoint@outlook.com"
                      >
                        <span className="ps-2">
                          <MdContactSupport />
                        </span>
                        الدعم الفني
                      </a>
                    </li>
                    <li>
                      <div
                        role="button"
                        className="dropdown-item  text-danger border-top"
                        onClick={logdedout}
                      >
                        <span className="ps-2 text-danger">
                          <IoIosLogOut />
                        </span>
                        تسجيل الخروج
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
              <Link to={`profile`}>
                <img
                  src={
                    user.photo
                      ? `${axiosInstanceParking.defaults.baseURL}/img/users/${user.photo}`
                      : "/images/defaultpersonjpg.jpg"
                  }
                  className="rounded-circle position-absolute top-0"
                  style={{ height: "4vh", width: "4vh", marginTop: "5px" }}
                  alt="..."
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={`/`}
                className="navbar-brand text-center align-self-center"
              >
                <img
                  style={{ height: "6vh", width: "6vh" }}
                  src="/images/logo3.png"
                  className={`${classes.logo} mx-4 mt-2  `}
                />
              </Link>
            </div>
          )}

          {isLoggedIn ? (
            <div
              className="collapse navbar-collapse col-2 d-flex justify-content-center flex-grow-0  "
              id="navbarSupportedContent"
            >
              <div className="navbar-nav mb-lg-0">
                <div className="nav-item ">
                  <Link to={`/`} className="navbar-brand ">
                    <img
                      src="/images/logo3.png"
                      style={{ height: "6vh", width: "6vh" }}
                      className={`${classes.logo} me-5  `}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <div className="navbar-nav pt-2 justify-content-end mb-lg-0 w-100 d-flex flex-row gap-4">
                <div className="nav-item fw-bold">
                  <Link
                    to={`/register`}
                    className="nav-link active text-white"
                    aria-current="page"
                    onClick={() => {
                      displayLogin();
                    }}
                  >
                    تسجيل الدخول
                  </Link>
                </div>
                <div className="nav-item fw-bold">
                  <Link
                    to={`/register`}
                    className="nav-link active ms-4  text-white"
                    aria-current="page"
                    onClick={() => {
                      displayRegester();
                    }}
                  >
                    التسجيل
                  </Link>
                </div>
                <LangaugeSwitch />
              </div>
            </div>
          )}
        </nav>
      </div>
      {isLoggedIn && user.role === "renter" && (
        <>
          <div>
            {(!user.isActivated || !user.isEmailConfirmed) && (
              <>
                <div className="alert alert-danger" role="alert">
                  <div>لكي تتمكن من اضافة موقف</div>
                  <ul>
                    {user.isActivated === false && (
                      <li>يرجى التواصل مع الدعم لتأكيد الهوية</li>
                    )}
                    {user.isEmailConfirmed === false && (
                      <>
                        <li>يرجى تأكيد البريد الالكتروني</li>
                        <div
                          className={`${classes.resendcode} pointer fs-6 fw-bold mt-md-1`}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={handleChange}
                        >
                          - اضغط هنا للتأكيد
                        </div>
                        <ConfimEmailPop userEmail={user.email} />
                      </>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}
