import { useRef } from 'react';
import classes from './../../styles/parkingFilter.module.css';
import axiosInstanceParking from '../../axiosConfig/instanc';
import { useSelector } from 'react-redux';
export default function ParkingFilter({ value, text, setUserParkings }) {
    const refValue = useRef();
    const token = useSelector((state) => state.loggedIn.token)
    console.log(token);
    const filterParkings = async (event) => {
        axiosInstanceParking.get(`/parkings/myparks/?status=${event.target.value}`, {
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
            </button>
            <input type="radio" value={value} name={value} hidden ref={refValue} onChange={filterParkings} />
        </>
    )
}
