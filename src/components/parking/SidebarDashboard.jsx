import { useState } from "react";
import classes from "./../../styles/sidebarDashboader.module.css";
import { MdEditNote } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { LuParkingSquareOff } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
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

export default function SidebarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logdedout = () => {
    dispatch(logout());
    navigate("/");
  };
  const user = useLogInUserData();
  var [isWide, setWide] = useState(false);
  const handleUnactive = () => {
    toast.error("يرجى التواصل مع الدعم لتأكيد الهوية اولا ");
  };
  return (
    <>
      <div
        onMouseLeave={() => {
          setWide(false);
        }}
        onMouseOver={() => {
          setWide(true);
        }}
        className={`${classes.sidebar}  position-fixed pt-2 top-0 end-0 z-1 transition whiteSpace h-100 overflow-x-hidden bgColor`}
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
                  <span className="icon-text ps-2  ">{isWide ? "إضافة موقف" : ""}</span>
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
    </>
  );
}
