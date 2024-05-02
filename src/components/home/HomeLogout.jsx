/* eslint-disable react/no-unknown-property */
import SearchInput from "../driver/SearchInput";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SpinnerLoad from "../spinner/Spinner";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function HomeLogout() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(function () {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Helmet>
        <title>Parking Point | الصفحة الرئيسية</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div
              className={`col-12 col-md-6 d-flex align-items-center bgColor justify-content-center`}
            >
              <div className={`w-75`}>
                <div className={`fs-3 my-5 text-light`}>{t("parking")}</div>
                <Link to={`/register`}>
                  <SearchInput />
                </Link>
              </div>
            </div>
            <div
              className={`col-12 col-md-6 d-flex align-items-center justify-content-center bgColor d-none d-md-block`}
            >
              <img src="/images/cars.png" className={`w-75`} alt="" />
            </div>
          </div>
          <div className={`row`}>
            <div
              className={`col-12 col-md-6 d-flex align-items-center justify-content-center`}
            >
              <img
                src="/images/Parking.gif"
                className={`w-75 rounded`}
                alt=""
              />
            </div>
            <div
              className={`col-12 col-md-6 d-flex align-items-center justify-content-center`}
            >
              <div className={`col-md-7 col-10`}>
                <div className={`fs-1 fw-bold mb-3`}>{t("aboutUs")}</div>
                <div className={` mb-3`} align="justify">
                  {t("aboutUs1")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
