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
import { BsLayoutTextSidebar } from "react-icons/bs";

export default function SidebarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logdedout = () => {
    dispatch(logout());
    navigate("/");
  };
  const user = useLogInUserData();
  var [isWide, setWide] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log("clicked");
  };
  const handleUnactive = () => {
    toast.error("يرجى التواصل مع الدعم لتأكيد الهوية اولا ");
  };

  return (
    <>
      {isSmallScreen && (
        <div
          className={`${classes.sidebarIcon} position-fixed top-0 start-0 z-1 transition`}
        >
          <BsLayoutTextSidebar
            color="red"
            className="position-fixed end-0 z-1 transition"
            onClick={toggleSidebar}
          />
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
          className={`${
            classes.sidebar
          } position-fixed pt-2 top-0 end-0 z-1 transition whiteSpace h-100 overflow-x-hidden bgColor ${
            isSidebarOpen ? "open" : ""
          }`}
        >
          <Link to={`/Profile`}>
            <div className={`d-flex mt-md-2 fs-5 fw-bold gap-2 `}>
              <div className="pe-2">
                <img
                  src={
                    user.photo
                      ? `${axiosInstanceParking.defaults.baseURL}/users/${user.photo}`
                      : "/images/defaultpersonjpg.jpg"
                  }
                  className=" border rounded-circle"
                  style={{ width: "6vh", height: "6vh" }}
                />
              </div>
              {isWide && (
                <div className="yellowcolor pt-1">
                  {user.firstName} {user.lastName}
                </div>
              )}
            </div>
          </Link>
          <div className="">
            {user.role == "renter" && (
              <>
                {user.isActivated == true ? (
                  <SideBareLink
                    href={`/Profile/parking`}
                    icon={<MdOutlineAddHomeWork className=" editIcon p-1" />}
                    text={isWide ? "إضافة موقف" : ""}
                  />
                ) : (
                  <div
                    className={`${classes.unactive}  fs-5 d-block`}
                    onClick={handleUnactive}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class={`${classes.customTooltip}`}
                    title="يرجى التواصل مع الدعم لتأكيد الهوية اولا"
                  >
                    <span>
                      <HiLockClosed className="  editIcon p-2" />
                    </span>
                    <span className="icon-text ps-2  ">
                      {isWide ? "إضافة موقف" : ""}
                    </span>
                  </div>
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
              icon={<MdEditNote className=" editIcon p-1" />}
              text={isWide ? "تعديل حسابي" : ""}
            />
            <div onClick={logdedout} className="sidebar fs-5" role="button">
              <span>
                <IoIosLogOut className=" editIcon p-1 pe-3" />
              </span>
              {isWide && <span className="icon-text pe-2"> تسجيل الخروج</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
