import ParkingCard from "./ParkingCard";

import SearchSec from "./searchSec";
// import SelectLocation from "./selectlocation";

export default function HomeLogin() {
  return (
    <div className={`container-fluid`}>
      <div className={`d-flex flex-row gap-4`}>
        {/* sec1 */}
        <SearchSec />
        {/* sec2 */}
        <div className={`col-4 px-2 `} id="navbar-example2">
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
        </div>
        {/* sec3 */}
        <div className={`col-4`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi minus sunt nisi aut assumenda, corporis quod
          perspiciatis nemo commodi, quibusdam eos, earum vitae deleniti optio animi facere iste laboriosam. Molestias?
        </div>
      </div>
    </div>
  );
}
