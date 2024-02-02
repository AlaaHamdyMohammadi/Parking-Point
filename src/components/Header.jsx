import { Link } from "react-router-dom";
import classes from './../styles/header.module.css';
export default function Header() {
  return (
    <div>
      <nav className={`navColor navbar navbar-expand-lg shadow`}>
        <div className="container">
          <Link to={`/`} className="navbar-brand" href="#"><img src="./images/logo3.png" className={`${classes.logo}`}/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-4 flex justify-content-between">
              <li className="nav-item">
                <Link to={`/التسجيل`} className="nav-link active text-white" aria-current="page" href="#">تسجيل الدخول</Link>
              </li>
              <li className="nav-item">
                <Link to={`/التسجيل`} className="nav-link active text-white" aria-current="page" href="#">التسجيل</Link>
              </li>
              <li className="nav-item">
                <Link to={``} className="nav-link active text-white" aria-current="page" href="#">الدعم الفني</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
