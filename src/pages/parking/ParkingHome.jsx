import { Link } from "react-router-dom";
import ParkingCard from "../../components/dashboader/ParkingCard";
import ParkingFilter from "../../components/dashboader/ParkingFilter";
import { useState } from "react";
import useLogInUserData from "../../../hook/useLogInUserData";

export default function ParkingHome() {
  const [userParkings, setUserParkings] = useState([]);
  const user = useLogInUserData();

  return (
    <div className={`d-flex flex-column m-md-5 m-2`}>
      <div className={`d-md-flex w-md-75 mb-5 pb-md-4 pb-1 border-bottom`}>
        <div className="mb-md-0 mb-3 col-6 col-md-5">
          <Link
            to={user.isActivated == false ? `/` : `/Profile/parking`}
            className={
              user.isActivated == false
                ? `text-decoration-none btn btn-outline-secondary text-dark`
                : `text-decoration-none btn btn-outline-warning text-dark`
            }
            {...(!user.isActivated && {
              "data-bs-toggle": "tooltip",
              "data-bs-placement": "top",
              title: "يرجى التواصل مع الدعم لتأكيد الهوية أولا",
            })}
          >
            اضافة موقف جديد
          </Link>
        </div>
        <div className={`d-flex w-75`}>
          <ParkingFilter value={""} text="الجميع" setUserParkings={setUserParkings} />
          <ParkingFilter value={"?status=approved"} text="نشط" setUserParkings={setUserParkings} />
          <ParkingFilter value={"?status=pending"} text="قيد الانتظار" setUserParkings={setUserParkings} />
          <ParkingFilter value={"?status=rejected"} text="مرفوض" setUserParkings={setUserParkings} />
        </div>
      </div>
      <div className={`align-self-center w-75`}>
        <ParkingCard userParkings={userParkings} setUserParkings={setUserParkings} />
      </div>
    </div>
  );
}
