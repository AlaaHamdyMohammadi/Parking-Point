import { Link } from "react-router-dom";
import classes from "./../../styles/Header_2.module.css";

export default function Header_2() {
  return (
    <div>
    <nav className={`shadow navbar navbar-expand-lg shadow`}>
      <div className="container">
        <Link to={`/`} className="">
          <img src="../../../../public/parkingpointlogo2.png" className={`${classes.logo}`} />
        </Link>
      </div>
    </nav>
  </div>
  )
}
