/* eslint-disable react/prop-types */
import classes from "./../../styles/parkingFilter.module.css";
import axiosInstanceParking from "../../axiosConfig/instanc";
export default function ParkingFilter({ value, text, setUserParkings }) {
  const filterParkings = async () => {
    axiosInstanceParking
      .get(`/parkings/myparks/${value}`)
      .then((res) => {
        setUserParkings(res.data.doc);
      })
      .catch((err) => {
        console.error("Error during parkings request:", err);
      });
  };
  return (
    <>
      <button className={`${classes.filterBtn} btn btn-outline-warning d-flex col-2 p-2 w-auto ms-2`} onClick={filterParkings}>
        {text}
      </button>
    </>
  );
}
