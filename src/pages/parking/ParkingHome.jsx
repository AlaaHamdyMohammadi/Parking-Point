import ParkingCard from "../../components/dashboader/ParkingCard";
import ParkingFilter from "../../components/dashboader/ParkingFilter";
export default function ParkingHome() {
  return (
    <div  className={`mt-5`}>
      {/* <div className={`d-flex align-self-center w-75 mt-4`}>
        <ParkingFilter value={"all"} text="الجميع" count={1} />
        <ParkingFilter value={"active"} text="نشط" count={6} />
        <ParkingFilter value={"pending"} text="قيد الانتظار" count={2} />
        <ParkingFilter value={"inactive"} text="غير نشط" count={3} />
      </div> */}
      <div className={`align-self-center w-75`}>
        <ParkingCard />
      </div>
    </div>
  );
}
