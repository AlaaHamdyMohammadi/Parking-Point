import { Link } from "react-router-dom";

export default function SideBareLink({href, icon, text}) {
  return (
    <>
        <Link to={href}>
          <span> {icon}</span> 
          {/* <CgProfile className=" editIcon pe-2" /> */}
          <span className="icon-text pe-4 "> {text}</span>
        </Link>
    </>
  )
}
