import Map from "./Map";
import ParkingCard from "./ParkingCard";
import { IoArrowRedoCircleOutline } from "react-icons/io5";

import SearchSec from "./searchSec";
// import Map from "./Map";
// import SelectLocation from "./selectlocation";
import { useState } from "react";

export default function HomeLogin() {
  const [isSearch, setIsSearch] = useState(false);
  // const [SearchParks, setSearchParks] = useState([]);
  // console.log(SearchParks, "hommmmmmmmmmmmmme");
  function handlesetIsSearch() {
    setIsSearch(!isSearch);
  }

  // function handlesetSearchParks(AvaliableParks) {
  //   setSearchParks(AvaliableParks);
  // }
  return (
    <div className={``}>
      <div className={`d-lg-flex flex-row gap-1`}>
        {/* sec1 */}
        {!isSearch && (
          <div className="  col-lg-3  px-3 col-md-3 col-sm-12">
            {/* SearchParks={handlesetSearchParks} */}
            <SearchSec setIsSearch={setIsSearch} />
          </div>
        )}

        {/* sec2 */}
        {isSearch && (
          <div className={`col-lg-4 col-md-4 col-sm-4 px-2 `} id="navbar-example2">
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
              style={{ maxHeight: "80vh" }} // Set a max height to enable scrolling
            >
              <ParkingCard />
            </div>
          </div>
        )}
        {/* sec3 */}
        <div className={`col-lg-9 col-md-9 col-sm-4 `}>
          <Map />
        </div>
      </div>
    </div>
  );
}
