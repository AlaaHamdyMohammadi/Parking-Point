import { Link } from "react-router-dom";

export default function Header_2() {
  return (
    <nav className={`shadow d-flex   justify-content-end`}>
      <div className="">
        <Link to={`/`}>
          <img src="/parkingpointlogo2.png" className={` mt-1  p-1 mx-4`} />
        </Link>
      </div>
    </nav>
  );
}
