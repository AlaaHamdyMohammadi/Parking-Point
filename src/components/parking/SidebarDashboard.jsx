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
                <Link to={`حسابي/صاحب_موقف/:id`}>
                <div className={`d-flex mt-md-2`}>
                    <div className={`ms-4 p-2 ${classes.userName}`}>MM</div>
                    <div>Marim Mohmed</div>
                </div>
                </Link>
                <div className="">
                <SideBareLink href={`/لوحة_التحكم/:id/اضافة_موقف`} icon={<MdOutlineAddHomeWork className=" editIcon" />} text="اضافة موقف " />
                <SideBareLink href={`/لوحة_التحكم/:id`} icon={<LuParkingSquareOff className=" editIcon " />} text="المواقف" />
                <SideBareLink href={`/لوحة_التحكم/:id/مبيعاتك`} icon={<IoBagCheckOutline className=" editIcon " />} text="حجوزاتي" />
                <SideBareLink href={`/لوحة_التحكم/:id/حسابي/تعديل`} icon={<MdEditNote className=" editIcon " />} text="تعديل حسابي" />
                <SideBareLink href={`/`} icon={<IoIosLogOut className=" editIcon " />} text="تسجيل خروج" />
                </div>
            </div>
            <div id="main" className="d-flex"></div>
        </>
    );
}
