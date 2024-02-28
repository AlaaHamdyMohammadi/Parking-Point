import Map from "./Map";
// import ParkingCard from "./ParkingCard";
import { IoArrowRedoCircleOutline } from "react-icons/io5";

// import SearchSec from "./searchSec";
// import Map from "./Map";
// import SelectLocation from "./selectlocation";
import { useState } from "react";
import EndDateTime from "./EndDT";
import ParkingCard from "./ParkingCard";

export default function HomeLogin() {
  const [isSearch, setIsSearch] = useState(false);
  // const [SearchParks, setSearchParks] = useState([]);
  const [AvaliableParksFilter, setAvaliableParksFilter] = useState([]);
  function handlesetIsSearch() {
    setIsSearch(!isSearch);
  }

  const [BookNow, setBookNow] = useState(true);
  function handelBookNow() {
    setBookNow(true);
  }
  function handelBookLater() {
    setBookNow(false);
  }
  const handleReserveChange = (AvaliableParks) => {
    setAvaliableParksFilter(AvaliableParks);
  };
  console.log(AvaliableParksFilter, "AvaliableParks recive");
  // alert(AvaliableParksFilter);
  return (
    <div className={``}>
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
        <div className={`col-lg-9 col-md-12 col-sm-9 `}>
          <Map AvaliableParksFilter={AvaliableParksFilter} />
        </div>
      </div>
    </div>
  );
}
