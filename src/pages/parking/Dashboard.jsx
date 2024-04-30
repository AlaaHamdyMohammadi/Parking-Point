import { Outlet } from "react-router-dom";
import SidebarDashboard from "../../components/parking/SidebarDashboard";
import { useEffect, useState } from "react";
import SpinnerLoad from "../../components/spinner/Spinner";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(function () {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Helmet>
        <title>Parking Point | {t('dashboard.userData')}</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <div className="d-flex ">
          <div className="col-2">
            <SidebarDashboard />
          </div>
          <div className="col-9  gap-5 d-flex justify-content-center align-self-center flex-column">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
