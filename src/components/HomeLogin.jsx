import ParkingCard from "./ParkingCard";
import SearchInput from "./SearchInput";

export default function HomeLogin() {
  return (
    <div className={`container-fluid`}>
         <div className={`row`}>
                <div className={`col-12 col-md-8 mt-4 pe-5`}>
            <div className={`row`}>
                    <ParkingCard/>
                </div>
            </div>
                <div className={`col-12 col-md-3 d-flex mt-5 justify-content-center`}>
                    <div className={`w-100`}>
                    <div className={`fs-3 mb-5`}>ابحث عن موقف</div>
                        <SearchInput />
                    </div>
                </div>
            </div>
    </div>
  )
}
