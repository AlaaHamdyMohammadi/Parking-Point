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
                {/* <div className={`${classes.font} mb-3`} align="justify">
                  موقع الكتروني لحجز مواقف للسيارات هو نظام يستخدم لحجز المواقف
                  المتاحة من قبل المنازل و المباني وتيسير عملية حجزها. يهدف
                  المشروع إلى تحسين تجربة مستخدمي السيارات في العثور على مواقف
                  بشكل أكثر فعالية. يسمح للمستخدمين برؤية المواقف الشاغرة وحجزها
                  عبر هواتفهم. المشروع يعتمد على موقع الكتروني للكشف عن توفرها،
                  مما يتيح للسائقين معرفة المواقف الفارغة قبل وصولهم إلى المكان.
                  ويظهر لهم المواقف الشاغرة بشكل فعال. تتضمن الخدمة أيضًا نظام
                  دفع آمن يتيح للمستخدمين دفع رسوم الاستخدام أو حجز المواقف عبر
                  الموقع الالكتروني. يعمل المشروع على توفير مواقف للسيارات بشكل
                  أمن وتجنب الوقوف العشوائي في المناطق.المزدحمة
                </div> */}

                <ul className="p-3 m-0">
                  <li align="justify">{t("aboutUs1")}</li>
                  <li>{t("aboutUs2")}</li>
                  <li align="justify">{t("aboutUs3")}</li>
                  <li align="justify">{t("aboutUs4")}</li>
                  <li align="justify">{t("aboutUs5")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
