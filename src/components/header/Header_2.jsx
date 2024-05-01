import { Link } from "react-router-dom";
import classes from "./../../styles/header_2.module.css";
import LangaugeSwitch from "./LangaugeSwitch";

export default function Header_2() {
  return (
    <nav
      className={`shadow ${classes.heightCustom} bgColor d-flex justify-content-end`}
    >
      <div className="">
        <Link to={`/`}>
          <img
            src="/images/logo3.png"
            className={`${classes.logo} mt-1  p-1 mx-4`}
          />
        </Link>
      </div>
      <div className="mt-2">
        <LangaugeSwitch />
      </div>
    </nav>
  );
}
