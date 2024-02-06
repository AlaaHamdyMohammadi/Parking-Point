import SearchInput from './SearchInput';
import ParkingCard from './ParkingCard';
// import SelectLocation from "./selectlocation";

export default function HomeLogin() {
  return (
    <div className={`container-fluid`}>
      <div className={`row`}>
        <div className={`card col-12 col-md-3 m-2 py-2 `}>
          <div className={`w-100`}>
            <div className={` fs-2 my-5`}>ابحث عن اقرب موقف</div>
            <div className={`mb-4`}>
              <SearchInput />
              {/* <SelectLocation /> */}
            </div>
            <button className={`btn text-light navColor shadow`}>اعرض المواقف</button>
          </div>
        </div>
        <div className={`col-12 col-md-8`}>
          <div className={`row`}>
            <ParkingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
