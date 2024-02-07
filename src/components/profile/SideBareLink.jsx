import { Link } from "react-router-dom";

export default function SideBareLink({ href, icon, text }) {
  return (
    <>
      <Link to={href} className="fs-3 sidebar  p-9 d-block" style={{ textDecoration: "none" }}>
        <span> {icon}</span>

        <span className="icon-text pe-4 "> {text}</span>
      </Link>
    </>
  );
}
