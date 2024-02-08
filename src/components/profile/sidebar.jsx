import { useState } from "react";
import classes from "./../../styles/sidebarDashboader.module.css";

import { CgProfile } from "react-icons/cg";
import { MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import SideBareLink from "./SideBareLink";

export default function Sidebar() {
  const [mini, setMini] = useState(true);

  function toggleSidebar() {
    if (mini) {
      console.log("opening sidebar");
      document.getElementById("mySidebar").style.width = "300px";
      // document.getElementById("main").style.marginRight = "300px";
      setMini(false);
    } else {
      console.log("closing sidebar");
      document.getElementById("mySidebar").style.width = "85px";
      // document.getElementById("main").style.marginRight = "85px";
      setMini(true);
    }
  }

  return (
    <>
      <div
        id="mySidebar"
        onMouseEnter={toggleSidebar}
        onMouseLeave={toggleSidebar}
        className="sidebar w-10 position-fixed pt-2 top-0 end-0 z-1 transition whiteSpace h-100 overflow-x-hidden bgColor"
      >
        <div className={`d-flex mt-md-2 fs-3 px-2 fw-bolder my-4`}>
          <div className={` ms-4 p-2 yellowcolor ${classes.userName}`}>EF</div>
          <div className="yellowcolor">Esraa Fathy</div>
        </div>

        <SideBareLink
          href={`/Driveraccount/:DriverId`}
          icon={<CgProfile className=" editIcon pe-2 mx-2 mb-4" />}
          text="الملف الشخصي"
        />
        <SideBareLink
          href={`/Driveraccount/:DriverId/editDriverProfile`}
          icon={<MdEditNote className=" editIcon mx-2" />}
          text="تعديل حسابي"
        />
      </div>
      <div id="main" className="d-flex"></div>
    </>
  );
}
