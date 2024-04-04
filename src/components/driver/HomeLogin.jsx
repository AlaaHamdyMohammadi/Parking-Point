import Map from "./Map";
// import ParkingCard from "./ParkingCard";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
// import classes from "./../../styles/formStyles.module.css";
import { useEffect, useState } from "react";
import EndDateTime from "./EndDT";
// import StarRating from "./StarRating";
import ParkingCard from "./ParkingCard";
import useLogInUserData from "../../../hook/useLogInUserData";
import ParkingHome from "../../pages/parking/ParkingHome";
import SpinnerLoad from "../spinner/Spinner";
import { Helmet } from "react-helmet";

export default function HomeLogin() {
  const user = useLogInUserData();
  const [isSearch, setIsSearch] = useState(false);
  // const [SearchParks, setSearchParks] = useState([]);
  const [AvaliableParksFilter, setAvaliableParksFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function handlesetIsSearch() {
    setIsSearch(!isSearch);
  }

  const [BookNow, setBookNow] = useState(true);
  function handelBookNow() {
    setBookNow(true);
  }
  function handelBookLater() {
    setBookNow(false);
    // setsearchData({
    //   city: "",
    // from: BookNow ? new Date().toISOString().slice(0, 16) : null,
    // to: null})
  }
  const handleReserveChange = (AvaliableParks) => {
    setAvaliableParksFilter(AvaliableParks);
  };
  //console.log(AvaliableParksFilter, "AvaliableParks recive");

  useEffect(function () {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Helmet>
        <title>Parking Point | احجز الآن</title>
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
                <div className="  col-lg-3  px-3 col-md-12 col-sm-12">
                  <div className="d-flex mt-4 gap-4 ">
                    <div
                      onClick={handelBookNow}
                      className={
                        BookNow
                          ? "   p-2 fw-bold fs-5  customborder pointer border-bottom border-3 "
                          : "p-2 fw-bold pointer text-secondary text-opacity-50  border-0"
                      }
                    >
                      {" "}
                      حجز الآن
                    </div>
                    <div
                      onClick={handelBookLater}
                      className={
                        !BookNow
                          ? "   p-2 fw-bold fs-5  customborder border-bottom pointer border-3 "
                          : "p-2 fw-bold pointer  text-secondary text-opacity-50 border-0"
                      }
                    >
                      {" "}
                      احجز لآحقا
                    </div>
                  </div>
                  <div className={`card border-0  my-3`}>
                    <div
                      className={` shadow height text-center p-2 border-secondary-subtlepx-2 rounded-2 w-100 height`}
                    >
                      <div className={` fs-5 pe-4 my-4  text-end  fw-bolder`}>
                        ابحث عن اقرب موقف
                      </div>
                      <div className={``}>{/* <SelectLocation /> */}</div>
                      <div className={`mb-2`}>
                        <EndDateTime
                          BookNow={BookNow}
                          onReserveChange={handleReserveChange}
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
                  className={`col-lg-4 px-3 col-md-12 col-sm-12 px-2 `}
                  id="navbar-example2"
                >
                  <div className="d-flex justify-content-between  my-4">
                    {/* <div className="fs-5 fw-bolder">اختر الموقف المناسب</div> */}
                    <div className=" fw-bold">المواقف الأقرب لك ....</div>
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
                    <ParkingCard AvaliableParksFilter={AvaliableParksFilter} />
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
