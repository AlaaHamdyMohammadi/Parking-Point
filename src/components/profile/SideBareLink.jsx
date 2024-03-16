/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function SideBareLink({ href, icon, text }) {
  return (
    <>
      <Link to={href} className="fs-5 d-block" style={{ textDecoration: "none" }}>
        <span>{icon}</span>
        <span className="icon-text ps-2"> {text}</span>
      </Link>
    </>
  );
}
