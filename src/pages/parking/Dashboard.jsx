import { Outlet } from "react-router-dom";
import SidebarDashboard from "../../components/parking/SidebarDashboard";

export default function Dashboard() {
  return (
    <>
      <div className="d-flex ">
        <div className="col-2">
          <SidebarDashboard />
        </div>
        <div className="col-9  gap-5 d-flex justify-content-center flex-column">
          <Outlet />
        </div>
      </div>
    </>
  );
}
