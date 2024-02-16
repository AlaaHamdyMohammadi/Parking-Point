import SearchInput from "./SearchInput";
import ParkingCard from "./ParkingCard";
import Map from "./Map";
// import SelectLocation from "./selectlocation";

export default function HomeLogin() {
  return (
    <div className={`container-fluid`}>
      <div className={`d-flex flex-row gap-4`}>
        {/* sec1 */}
        <div className={`card border-0 col-3 my-5`}>
          <div className={` shadow height border-secondary-subtle px-2 rounded-3 w-100 height`}>
            <div className={` fs-4 my-2 fw-bolder`}>ابحث عن اقرب موقف</div>
            <div className={`mb-4`}>
              <SearchInput />
              {/* <SelectLocation /> */}
            </div>
            <button className={`text-center submit w-50  border rounded-3  fw-bold text-white shadow`}>اعرض المواقف</button>
          </div>
        </div>
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
          <Map/>
        </div>
      </div>
    </div>
  );
}
