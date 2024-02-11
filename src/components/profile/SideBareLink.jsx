import { Link } from "react-router-dom";

export default function SideBareLink({ href, icon, text }) {
  return (
    <>
      <Link to={href} className="fs-5 sidebar   d-block" style={{ textDecoration: "none" }}>
        <span> {icon}</span>

        <span className="icon-text pe-2 "> {text}</span>
      </Link>
    </>
  );
}
