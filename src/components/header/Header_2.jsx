import { Link } from "react-router-dom";
import classes from "./../../styles/Header_2.module.css";
// import { IoNotificationsOutline } from "react-icons/io5";

export default function Header_2() {
  return (
    <nav className={`shadow  d-flex   justify-content-end`}>
      <div className=" flex-grow"></div>

      {/* <div className=" align-self-end">
        <IoNotificationsOutline className="editIcon3 p-1 mx-3" />
      </div> */}
      <div className="">
        <Link to={`/`}>
          <img src="/parkingpointlogo2.png" className={`${classes.logo} p-1 mx-4`} />
        </Link>
      </div>
    </nav>
  );
}
