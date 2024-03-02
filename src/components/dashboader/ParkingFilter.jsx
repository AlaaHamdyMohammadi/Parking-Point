import classes from './../../styles/parkingFilter.module.css';
import axiosInstanceParking from '../../axiosConfig/instanc';
import { useSelector } from 'react-redux';
export default function ParkingFilter({ value, text, setUserParkings }) {
    const token = useSelector((state) => state.loggedIn.token)
    const filterParkings = async () => {
        axiosInstanceParking.get(`/parkings/myparks/?status=${value}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((res) => {
            setUserParkings(res.data.doc);
        })
            .catch((err) => {
                console.error("Error during parkings request:", err);
            });
    }
    return (
        <>
            <div className={`${classes.filterBtn} btn btn-outline-warning d-flex col-2 p-2 w-auto ms-4`} onClick={filterParkings}>
                {/* <div className={`ms-2`}>{text}</div> */}
                {text}
            </div>
        </>
    )
}
