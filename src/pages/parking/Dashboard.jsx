import { Outlet } from "react-router-dom";
import SidebarDashboard from "../../components/parking/SidebarDashboard";
import { useEffect, useState } from "react";
import SpinnerLoad from "../../components/spinner/Spinner";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    console.log("work");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? <SpinnerLoad/> : <div className="d-flex ">
        <div className="col-2">
          <SidebarDashboard />
        </div>
        <div className="col-9  gap-5 d-flex justify-content-center align-self-center flex-column">
          <Outlet />
        </div>
      </div>}
    </>
  );
}
