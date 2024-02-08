import { Outlet, useParams } from "react-router-dom";
import SidebarDashboard from "../../components/parking/SidebarDashboard";

export default function Dashboard() {
    let { id } = useParams()
  return (
    <div>
        <div className="d-flex">
    <div className="col-2">
      <SidebarDashboard />
    </div>
    <div className="col-9 gap-5 d-flex flex-column">
      <div className={`row  `}></div>
      <Outlet />
    </div>
  </div>
    </div>
  )
}
