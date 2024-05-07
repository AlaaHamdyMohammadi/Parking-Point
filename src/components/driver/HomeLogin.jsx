import Map from "./Map";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import EndDateTime from "./EndDT";
import ParkingCard from "./ParkingCard";
import useLogInUserData from "../../../hook/useLogInUserData";
import ParkingHome from "../../pages/parking/ParkingHome";
import SpinnerLoad from "../spinner/Spinner";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function HomeLogin() {
  const user = useLogInUserData();
  const { t } = useTranslation();
  const [isSearch, setIsSearch] = useState(false);
  const [AvaliableParksFilter, setAvaliableParksFilter] = useState([]);
  const [ReserveTime, setReserveTime] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  function handlesetIsSearch() {
    setIsSearch(!isSearch);
  }

  const [BookNow, setBookNow] = useState(true);
  function handelBookNow() {
    setBookNow(true);
  }
  function handelBookLater() {
    setBookNow(!BookNow);
  }
  const handleReserveChange = (AvaliableParks) => {
    setAvaliableParksFilter(AvaliableParks);
  };
  // console.log(AvaliableParksFilter, "AvaliableParks recive");
  const handleTimeChange = (ReserveTimeR) => {
    setReserveTime(ReserveTimeR);
  };
  // console.log(ReserveTime,"ReserveTime")

  useEffect(function () {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  const language = useSelector((state) => state.language.language);

  return (
    <>
      <Helmet>
        <title>Parking Point | {t("BookNow")}</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <div>
          {user.role == "renter" ? (
            <ParkingHome />
          ) : (
            <div className={`d-lg-flex flex-row gap-1`}>
              {/* sec1 */}
              {!isSearch && (
                <div className="col-lg-3 px-3 col-md-12 col-sm-12">
                  <div className="d-flex mt-4 gap-4 ">
                    <div
                      onClick={handelBookNow}
                      className={
                        BookNow
                          ? "   p-2 fw-bold fs-5  customborder pointer border-bottom border-3 "
                          : "p-2 fw-bold pointer text-secondary text-opacity-50  border-0"
                      }
                    >
                      {t("BookNow")}
                    </div>
                    <div
                      onClick={handelBookLater}
                      className={
                        !BookNow
                          ? "   p-2 fw-bold fs-5 customborder border-bottom pointer border-3 "
                          : "p-2 fw-bold pointer text-secondary text-opacity-50 border-0"
                      }
                    >
                      {t("BookLater")}
                    </div>
                  </div>
                  <div className={`card border-0  my-3`}>
                    <div
                      className={` shadow height text-center p-2 border-secondary-subtlepx-2 rounded-2 w-100 height`}
                    >
                      <div
                        className={` fs-5 pe-4 my-4 ${
                          language == "ar" ? "text-end" : "text-start"
                        } fw-bolder`}
                      >
                        {t("searchForBarking")}
                      </div>
                      <div className={``}>{/* <SelectLocation /> */}</div>
                      <div className={`mb-2`}>
                        <EndDateTime
                          BookNow={BookNow}
                          onReserveChange={handleReserveChange}
                          onTimeChange={handleTimeChange}
                          setIsSearch={setIsSearch}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* sec2 */}
              {isSearch && (
                <div
                  className={`col-lg-4 col-md-12 col-sm-12 px-2 `}
                  id="navbar-example2"
                >
                  <div className="d-flex justify-content-between  my-4">
                    {/* <div className="fs-5 fw-bolder">اختر الموقف المناسب</div> */}
                    <div className=" fw-bold">{t("nearstParking")}</div>
                    <div className="pointer fs-5  " onClick={handlesetIsSearch}>
                      <IoArrowRedoCircleOutline />
                    </div>
                  </div>
                  <div
                    data-bs-spy="scroll"
                    data-bs-target="#navbar-example2"
                    data-bs-root-margin="0px 0px -40%"
                    data-bs-smooth-scroll="true"
                    className="scrollspy-example overflow-auto "
                    tabIndex="0"
                    style={{ maxHeight: "80vh" }}
                  >
                    {AvaliableParksFilter.length > 0 ? (
                      <ParkingCard
                        AvaliableParksFilter={AvaliableParksFilter}
                        ReserveTime={ReserveTime}
                      />
                    ) : (
                      <div className="fs-3 fw-semibold text-center ">
                        <p className="my-5 py-5">{t("noParkings")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* sec3 */}
              <div className={`col-lg-9 col-md-12 col-sm-9 mb-2 `}>
                <Map AvaliableParksFilter={AvaliableParksFilter} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
