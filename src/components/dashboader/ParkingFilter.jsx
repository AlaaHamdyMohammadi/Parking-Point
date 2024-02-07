import { useRef } from 'react';
import classes from './../../styles/parkingFilter.module.css';
export default function ParkingFilter({ value, text, count }) {
    const refValue = useRef();
    const displayFilter = () => {
        console.log(refValue.current.value);
    };
    return (
        <>
            <button className={`${classes.filterBtn} btn btn-outline-warning d-flex p-2 ms-4`} onClick={() => { displayFilter() }}>
                <div className={`fw-bold ms-2`}>{text}</div>
                <div className={`fw-bold`}>{count}</div>
            </button>
            <input type="text" value={value} name={value} hidden ref={refValue} disabled />
        </>
    )
}
