import { Outlet } from "react-router-dom";
import Sidebar from "./../../components/profile/sidebar";
export default function Profile() {
  return (
    <>
      <div className="d-flex">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-9 gap-5 d-flex flex-column">
          <div className={`row`}></div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
