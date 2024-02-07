import Photoprofile from "../components/profile/photoprofile";
import Sidebar from "../components/profile/sidebar";
import { Outlet } from "react-router-dom";
export default function Profile() {
  return (
    <>
      <div className="d-flex">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-9 gap-5 d-flex flex-column">
          <div className={`  `}>
            <Photoprofile />
          </div>
          <div className={`row  `}></div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
