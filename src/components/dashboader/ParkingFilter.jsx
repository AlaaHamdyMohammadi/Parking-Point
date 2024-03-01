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
            <button className={`${classes.filterBtn} btn btn-outline-warning d-flex p-2 ms-4`} onClick={filterParkings}>
                <div className={`ms-2`}>{text}</div>
            </button>
        </>
    )
}
