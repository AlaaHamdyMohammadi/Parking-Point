import { Link } from "react-router-dom";
import classes from "./../../styles/Header_2.module.css";

export default function Header_2() {
  return (
    <nav className={`shadow  d-flex   justify-content-end`}>
      <div className=" flex-grow"></div>

      <div className="">
        <Link to={`/`}>
          <img src="/parkingpointlogo2.png" className={`${classes.logo} p-1 mx-4`} />
        </Link>
      </div>
    </nav>
  );
}
