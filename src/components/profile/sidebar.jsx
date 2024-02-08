import { useState } from "react";

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
        <Link to={`/`} href="#">
          <img style={{ height: "8vh", width: "8vh" }} className="mb-5 mt-2" src="../images/logo3.png" alt="" />
        </Link>
        <SideBareLink
          href={`/Driveraccount/:DriverId`}
          icon={<CgProfile className=" editIcon pe-2 mx-2 mb-4" />}
          text="الملف الشخصي"
        />
        <SideBareLink
          href={`/Driveraccount/:DriverId/editDriverProfile`}
          icon={<MdEditNote className=" editIcon mx-2" />}
          text="تعديل الملف"
        />
      </div>
      <div id="main" className="d-flex"></div>
    </>
  );
}
