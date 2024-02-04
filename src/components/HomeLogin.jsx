import ParkingCard from "./ParkingCard";
import SearchInput from "./SearchInput";
// import SelectLocation from "./selectlocation";

export default function HomeLogin() {
  return (
    <div className={`container-fluid`}>
      <div className={`row`}>
        <div className={`col-12 col-md-3 d-flex m-5  border border-secondary rounded justify-content-center`}>
          <div className={`w-100`}>
            <div className={` fs-2 my-5`}>ابحث عن اقرب موقف</div>
            <div className={`d-flex flex-column `}>
              <SearchInput />
              {/* <SelectLocation /> */}
            </div>

            <button className={`btn mt-5 text-light navColor shadow`}>اعرض المواقف</button>
          </div>
        </div>
        <div className={`col-12  col-md-8 mt-4 pe-5`}>
          <div className={`row`}>
            <ParkingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
