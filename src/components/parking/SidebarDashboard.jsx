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

export default function SidebarProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const logdedout = () => {
    dispatch(logout());
    navigate("/")
  };
  const user = useLogInUserData();
  const [mini, setMini] = useState(true);
  function toggleSidebar() {
    if (mini) {
      document.getElementById("mySidebar").style.width = "220px";
      setMini(false);
    } else {
      document.getElementById("mySidebar").style.width = "60px";
      setMini(true);
    }
  }
  return (
    <>
      <div
        id="mySidebar"
        onMouseEnter={toggleSidebar}
        onMouseLeave={toggleSidebar}
        className={`${classes.sidebar} w-10 position-fixed pt-2 top-0 end-0 z-1 transition whiteSpace h-100 overflow-x-hidden bgColor`}
      >
        <Link to={`/Profile`}>
          <div className={`d-flex mt-md-2 fs-5 fw-bold my-4`}>
            <div className="yellowcolor">{user.firstName} {user.lastName}</div>
          </div>
        </Link>
        <div className="">
          {user.role == 'renter' &&
            <>
              <SideBareLink
                href={`/Profile/parking`}
                icon={<MdOutlineAddHomeWork className=" editIcon p-1" />}
                text="اضافة موقف "
              />
              <SideBareLink href={`/Profile/parkingHome`} icon={<LuParkingSquareOff className="editIcon p-2" />} text="المواقف" />
            </>
          }
          <SideBareLink
            href={`/Profile/sales`}
            icon={<IoBagCheckOutline className=" editIcon p-1" />}
            text="حجوزاتي"
          />
          <SideBareLink
            href={`/Profile/editOwnerProfile`}
            icon={<MdEditNote className=" editIcon p-1" />}
            text="تعديل حسابي"
          />
          <div onClick={logdedout} className="sidebar fs-5" role="button">
            <span> <IoIosLogOut className=" editIcon p-1" /></span>
            <span className="icon-text pe-2"> تسجيل الخروج</span>
          </div>
        </div>
      </div>
    </>
  );
}