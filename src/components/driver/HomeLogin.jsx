import Map from "./Map";
import ParkingCard from "./ParkingCard";

import SearchSec from "./searchSec";
// import Map from "./Map";
// import SelectLocation from "./selectlocation";

export default function HomeLogin() {
  return (
    <div className={`container-fluid`}>
      <div className={`d-lg-flex flex-row gap-4`}>
        {/* sec1 */}
        <div className="  col-lg-3  col-md-12 col-sm-12">
          <SearchSec />
        </div>
        {/* sec2 */}
        {/* <div className={`col-lg-4 col-md-12 col-sm-12 px-2 `} id="navbar-example2">
          <div className="d-flex  flex-column gap-4 my-5">
            <div className="fs-5 fw-bolder">اختر الموقف المناسب</div>
            <div className=" fw-bold">المواقف الأقرب لك ....</div>
          </div>
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example2"
            data-bs-root-margin="0px 0px -40%"
            data-bs-smooth-scroll="true"
            className="scrollspy-example overflow-auto "
            tabIndex="0"
            style={{ maxHeight: "40rem" }} // Set a max height to enable scrolling
          >
            <ParkingCard />
          </div>
        </div> */}
        {/* sec3 */}
        <div className={`col-lg-9 col-md-9 col-sm-12 `}>
          <Map />
        </div>
      </div>
    </div>
  );
}
