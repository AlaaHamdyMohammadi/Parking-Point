import { useState } from "react";
import classes from "./../../styles/sidebarDashboader.module.css";
import { IoIosLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";

import { CgProfile } from "react-icons/cg";
import { MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import SideBareLink from "./SideBareLink";

export default function Sidebar() {
  const [mini, setMini] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  // function toggleSidebar() {
  //   setShowSidebar(!showSidebar);
  // }

  function toggleSidebar() {
    if (mini) {
      console.log("opening sidebar");
      document.getElementById("mySidebar").style.width = "220px";
      document.getElementById("main").style.marginRight = "300px";
      setMini(false);
    } else {
      console.log("closing sidebar");
      document.getElementById("mySidebar").style.width = "60px";
      document.getElementById("main").style.marginRight = "85px";
      setMini(true);
    }
  }

  return (
    <>
      {/* <div id="mySidebar" className={`${classes.sidebar} ${showSidebar ? classes.showSidebar : ""}`}>
        </div> */}
      <div
        id="mySidebar"
        onMouseEnter={toggleSidebar}
        onMouseLeave={toggleSidebar}
        className="sidebar  position-fixed  pt-2 top-0 end-0 z-1 transition whiteSpace h-100 overflow-x-hidden bgColor"
      >
        <div className={`d-flex mt-md-2 fs-5 px-1  fw-bold my-4`}>
          <div className={` ms-3 p-2   yellowcolor ${classes.userName}`}>EF</div>
          <div className="yellowcolor">Esraa Fathy</div>
        </div>

        <SideBareLink
          href={`/Driveraccount/:DriverId`}
          icon={<CgProfile className=" editIcon py-1 mx-2 my-1 " />}
          text="الملف الشخصي"
        />

        <SideBareLink
          href={`/Driveraccount/:DriverId/MyTrips`}
          icon={<IoBagCheckOutline className=" editIcon p-1 mx-2 my-1" />}
          text="حجوزاتي"
        />
        <SideBareLink
          href={`/Driveraccount/:DriverId/editDriverProfile`}
          icon={<MdEditNote className=" editIcon mx-1 my-1 " />}
          text="تعديل حسابي"
        />
        <SideBareLink href={`/`} icon={<IoIosLogOut className=" editIcon m-2 p-1 my-1" />} text="تسجيل خروج" />
      </div>
      <div id="main" className="d-flex"></div>
    </>
  );
}
