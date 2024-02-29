import { Link } from "react-router-dom";
import ParkingCard from "../../components/dashboader/ParkingCard";
import ParkingFilter from "../../components/dashboader/ParkingFilter";
import { useState } from "react";
export default function ParkingHome() {
  const [userParkings, setUserParkings] = useState([])
  return (
    <div  className={`d-flex flex-column justify-content-center m-5`}>
      <div className={`d-flex align-self-center justify-content-between w-75 mb-5 pb-4 border-bottom`}>
        <div className={`d-flex align-self-center w-75`}>
        <ParkingFilter value={"approved"} text="نشط" setUserParkings={setUserParkings}/>
        <ParkingFilter value={"pending"} text="قيد الانتظار" setUserParkings={setUserParkings}/>
        <ParkingFilter value={"rejected"} text="مرفوض" setUserParkings={setUserParkings}/>
        </div>
        <div>
          <Link to={`/Profile/parking`} className="text-decoration-none btn btn-outline-warning text-dark">اضافة موقف جديد</Link>
        </div>
      </div>
      <div className={`align-self-center w-75`}>
        <ParkingCard  userParkings={userParkings} setUserParkings={setUserParkings}/>
      </div>
    </div>
  );
}
