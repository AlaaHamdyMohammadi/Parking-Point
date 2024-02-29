import { useRef } from 'react';
import classes from './../../styles/parkingFilter.module.css';
import axiosInstanceParking from '../../axiosConfig/instanc';
import { useSelector } from 'react-redux';
export default function ParkingFilter({ value, text, setUserParkings }) {
    const refValue = useRef();
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
    const displayFilter = () => {
        refValue.current.click();
    };
    return (
        <>
            <button className={`${classes.filterBtn} btn btn-outline-warning d-flex p-2 ms-4`} onClick={() => { displayFilter() }}>
                <div className={`fw-bold ms-2`}>{text}</div>
                <div className={`fw-bold`}>{0}</div>
            </button>
            <input type="radio" value={value} name={value} hidden ref={refValue} onChange={filterParkings} />
        </>
    )
}
