/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import classes from "./../../styles/sidebarDashboader.module.css";
import { MdEditNote } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { LuParkingSquareOff } from "react-icons/lu";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SideBareLink from "../profile/SideBareLink";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import useLogInUserData from "../../../hook/useLogInUserData";
import axiosInstanceParking from "./../../axiosConfig/instanc";
import { HiLockClosed } from "react-icons/hi2";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { toast, ToastContainer } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { MdOutlineAdsClick } from "react-icons/md";
import useSendCode from "../../../hook/useSendCode";
import ConfimEmailPop from "../login-register/confirmEmailpop";

export default function SidebarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logdedout = () => {
    dispatch(logout());
    navigate("/");
  };
  const user = useLogInUserData();
  var [isWide, setWide] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleUnactive = () => {
    toast.error("يرجى التواصل مع الدعم  ");
  };
  const handleChange = useSendCode();
  return (
    <>
      {isSmallScreen && (
        <div
          className={`${classes.sidebar} position-fixed top-0 start-0 z-1 transition`}
        >
          <GiHamburgerMenu
            className="position-fixed fs-1 p-1 pointer mx-2 mt-2  end-0 z-1 transition  dropdown-toggle"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          />

          <div
            className={`offcanvas offcanvas-end bgColor pe- ${classes.customW}`}
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div className="offcanvas-header d-flex flex-row">
              <div
                className={` text-end d-flex mt-md-2 fs-5 fw-bold gap-2 offcanvas-title`}
                id="offcanvasWithBothOptionsLabel"
              >
                <Link to={`/Profile`}>
                  <div className="pe-2">
                    <img
                      src={
                        user.photo
                          ? `${axiosInstanceParking.defaults.baseURL}/img/users/${user.photo}`
                          : "/images/defaultpersonjpg.jpg"
                      }
                      className=" border rounded-circle"
                      style={{ width: "5vh", height: "5vh" }}
                    />
                  </div>
                </Link>
                <div className={`${classes.unactive} d-flex flex-column`}>
                  <Link to={`/Profile`}>
                    <div className={`yellowcolor ms-2 ${classes.userName}`}>
                      {user.firstName} {user.lastName}
                    </div>
                  </Link>
                </div>
              </div>
              <button
                type="button"
                className={`btn-close  text-secondary text-start`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body pe-2">
              {user.role == "renter" && (
                <>
                  {!user.isActivated || !user.isEmailConfirmed ? (
                    <div
                      className={`${classes.unactive}  fs-5 d-block`}
                      onClick={handleUnactive}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-custom-class={`${classes.customTooltip}`}
                      title="يرجى التواصل مع الدعم"
                    >
                      <span>
                        <HiLockClosed className="  editIcon p-2" />
                      </span>
                      <span className="icon-text ps-2  ">
                        {isWide ? "إضافة موقف" : ""}
                      </span>
                    </div>
                  ) : (
                    <SideBareLink
                      href={`/Profile/parking`}
                      icon={<MdOutlineAddHomeWork className=" editIcon p-1" />}
                      text="إضافة موقف"
                    />
                  )}
                  <ToastContainer position="top-right" autoClose={10000} />

                  <SideBareLink
                    href={`/`}
                    icon={<LuParkingSquareOff className="  editIcon p-2" />}
                    text="المواقف"
                  />
                </>
              )}
              <SideBareLink
                href={`/Profile/sales`}
                icon={<LiaMoneyCheckAltSolid className=" editIcon p-1" />}
                text="حجوزاتي"
              />
              <SideBareLink
                href={`/Profile/editOwnerProfile`}
                icon={<MdEditNote className=" editIcon p-1" />}
                text="تعديل حسابي"
              />
              <div onClick={logdedout} className="sidebar fs-5" role="button">
                <span>
                  <IoIosLogOut className=" editIcon p-1" />
                </span>
                <span className="icon-text pe-1">تسجيل الخروج</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isSmallScreen && (
        <div
          onMouseLeave={() => {
            setWide(false);
          }}
          onMouseOver={() => {
            setWide(true);
          }}
          className={`${classes.sidebar} pe-2 position-fixed pt-2 top-0 end-0 z-1 transition whiteSpace h-100 overflow-x-hidden bgColor 
          `}
        >
          <div className={`d-flex mt-md-2 fs-5 fw-bold gap-2 `}>
            <Link to={`/Profile`}>
              <div className="pe-2">
                <img
                  src={
                    user.photo
                      ? `${axiosInstanceParking.defaults.baseURL}/img/users/${user.photo}`
                      : "/images/defaultpersonjpg.jpg"
                  }
                  className=" border rounded-circle"
                  style={{ width: "6vh", height: "6vh" }}
                />
              </div>
            </Link>
            {isWide && (
              <>
                <div className={`${classes.unactive} d-flex flex-column`}>
                  <Link to={`/Profile`}>
                    <div className={`yellowcolor ms-2 ${classes.userName}`}>
                      {user.firstName} {user.lastName}
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>

          <div
            className={
              isWide ? "ps-3 sidebar transition" : "sidebar transition"
            }
          >
            {user.role == "renter" && (
              <>
                {!user.isActivated || !user.isEmailConfirmed ? (
                  <div
                    className={`${classes.unactive}  fs-5 d-block`}
                    onClick={handleUnactive}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class={`${classes.customTooltip}`}
                    title="يرجى التواصل مع الدعم   "
                  >
                    <span>
                      <HiLockClosed className="  editIcon p-2" />
                    </span>
                    <span className="icon-text ps-2  ">
                      {isWide ? "إضافة موقف" : ""}
                    </span>
                  </div>
                ) : (
                  <SideBareLink
                    href={`/Profile/parking`}
                    icon={<MdOutlineAddHomeWork className=" editIcon p-1" />}
                    text={isWide ? "إضافة موقف" : ""}
                  />
                )}
                <ToastContainer position="top-right" autoClose={10000} />

                <SideBareLink
                  href={`/`}
                  icon={<LuParkingSquareOff className="editIcon p-2" />}
                  text={isWide ? "المواقف" : ""}
                />
              </>
            )}
            <SideBareLink
              href={`/Profile/sales`}
              icon={<LiaMoneyCheckAltSolid className=" editIcon p-1" />}
              text={isWide ? "حجوزاتي" : ""}
            />
            <SideBareLink
              href={`/Profile/editOwnerProfile`}
              icon={<MdEditNote className=" editIcon " />}
              text={isWide ? "تعديل حسابي" : ""}
            />
            <div onClick={logdedout} className="sidebar fs-5" role="button">
              <span>
                <IoIosLogOut className=" editIcon p-1 " />
              </span>
              {isWide && <span className="icon-text pe-2"> تسجيل الخروج</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
