import { Link } from "react-router-dom";

export default function ParkingCard() {
    return (
        <>
            <div className="card m-2 col-3">
                <img src="./images/backgroundjpg.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of thes content.</p>
                    <Link to={``} href="#" className="btn btn-primary">Go somewhere</Link>
                </div>
            </div>
        </>
    )
}
