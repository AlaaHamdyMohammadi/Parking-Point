/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import classes from "./../../styles/header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changLog } from "../../store/slices/login";
import { IoPerson } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";
import { logout } from "../../store/slices/authSlice";

export default function Header() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const isLoggedIn =useSelector ((state) => state.loggedIn.loggedIn);
  const displayRegester = () => {
    dispatch(changLog(true));
  };
  const displayLogin = () => {
    dispatch(changLog(false));
  };
  const logdedout = () => {
    dispatch(logout());
    navigate("/")
  };
  
  return (
    <>
      <nav className={`navColor p-2 d-flex w-100 justify-content-between navbar-expand-lg shadow`}>
        {isLoggedIn ? (
          <div className="position-relative">
            <div className="btn-group border-0">
              <button
                type="button"
                className=" mx-5  navcolor fs-5 border-0 text-white dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu">
                <div className="  text-end">
                  <li>
                    <Link to={`Driveraccount/:DriverId/MyTrips`} className="dropdown-item">
                      <span className="ps-2">
                        <IoBagCheckSharp />
                      </span>
                      حجوزاتي
                    </Link>
                  </li>
                  <li>
                    <Link to={`Driveraccount/:DriverId`} className="dropdown-item">
                      <span className="ps-2">
                        <IoPerson />
                      </span>
                      إدارة حسابي
                    </Link>
                  </li>
                  <li>
                    <Link to={`#`} className="dropdown-item">
                      <span className="ps-2">
                        <MdContactSupport />
                      </span>
                      الدعم الفني
                    </Link>
                  </li>
                  <li>
                    <div role="button" className="dropdown-item  text-danger border-top" onClick={logdedout}>
                      <span className="ps-2 text-danger">
                        <IoIosLogOut />
                      </span>
                      تسجيل الخروج
                    </div>
                  </li>
                </div>
              </ul>
            </div>
            <Link to={`/Driveraccount/:DriverId/editDriverProfile`}>
              <img
                src="./../../../public/images/defaultpersonjpg.jpg"
                className="rounded-circle position-absolute top-0 start-0"
                style={{ height: "5vh", width: "5vh" }}
                alt="..."
              />
            </Link>
          </div>
        ) : (
          <Link to={`/`} className="navbar-brand">
            <img src="./../../../images/logo3.png" className={`${classes.logo} mx-4`} />
          </Link>
        )}

        {isLoggedIn ? (
          <div className="collapse navbar-collapse flex-grow-0 mx-4 " id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0 col-4 flex justify-content-between">
              <li className="nav-item">
                <Link to={`/`} className="navbar-brand text-end">
                  <img
                    src="./../../../images/logo3.png"
                    style={{ height: "5vh", width: "5vh" }}
                    className={`${classes.logo}`}
                  />
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="col-3 " id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0 w-100 d-flex flex-row gap-4">
              <li className="nav-item fw-bold">
                <Link
                  to={`/register`}
                  className="nav-link active text-white"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    displayLogin();
                  }}
                >
                  تسجيل الدخول
                </Link>
              </li>
              <li className="nav-item fw-bold">
                <Link
                  to={`/register`}
                  className="nav-link active text-white"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    displayRegester();
                  }}
                >
                  التسجيل
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
