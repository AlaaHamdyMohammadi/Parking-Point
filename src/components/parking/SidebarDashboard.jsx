import { useState } from "react";

import classes from "./../../styles/sidebarDashboader.module.css";
import { MdEditNote } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { LuParkingSquareOff } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { Link } from "react-router-dom";
import SideBareLink from "../profile/SideBareLink";

export default function SidebarDashboard() {
  const [mini, setMini] = useState(true);

  function toggleSidebar() {
    if (mini) {
      console.log("opening sidebar");
      document.getElementById("mySidebar").style.width = "300px";
      setMini(false);
    } else {
      console.log("closing sidebar");
      document.getElementById("mySidebar").style.width = "85px";
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
        <Link to={`/dashboard/:ownerId/Owneraccount/ownerProfile`}>
          <div className={`d-flex mt-md-2 fs-3 fw-bolder my-4`}>
            <div className={`ms-4 p-2 yellowcolor  ${classes.userName}`}>MM</div>
            <div className="yellowcolor">Marim Mohmed</div>
          </div>
        </Link>
        <div className="">
          <SideBareLink
            href={`/dashboard/:ownerId/add_parking`}
            icon={<MdOutlineAddHomeWork className=" editIcon p-1" />}
            text="اضافة موقف "
          />
          <SideBareLink href={`/dashboard/:ownerId`} icon={<LuParkingSquareOff className="editIcon p-2" />} text="المواقف" />
          <SideBareLink
            href={`/dashboard/:ownerId/sales`}
            icon={<IoBagCheckOutline className=" editIcon p-1" />}
            text="حجوزاتي"
          />
          <SideBareLink
            href={`/dashboard/:ownerId/Owneraccount/editOwnerProfile`}
            icon={<MdEditNote className=" editIcon p-1" />}
            text="تعديل حسابي"
          />
          <SideBareLink href={`/`} icon={<IoIosLogOut className=" editIcon p-1" />} text="تسجيل خروج" />
        </div>
      </div>
      <div id="main" className="d-flex"></div>
    </>
  );
}
