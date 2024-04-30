import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  const { t } = useTranslation();
  let goBack = () => {
    navigate(-1);
  };
  return (
    <main style={{ height: "175vw" }}>
      <h2 className="text-center">{t("notFoundTitle")}</h2>
      <div className="d-flex justify-content-center">
        <img src="/images/404-error.png" className="w-25" alt="" />
      </div>
      {/*  */}
      <main>
        <div className="d-flex justify-content-around">
          <div>
            <Link
              to={`/`}
              className="text-decoration-none btn btn-outline-warning text-dark"
            >
              {t("hendleErrorHome")}
            </Link>
          </div>
          <div>
            <button
              onClick={goBack}
              className="text-decoration-none btn btn-outline-warning text-dark"
            >
              {t("handleErrorBack")}
            </button>
          </div>
        </div>
      </main>
    </main>
  );
}
