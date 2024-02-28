import { Link } from "react-router-dom";
import StarRating from "../driver/StarRating";
import { useEffect, useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
export default function ParkingCard() {
  const token = useSelector((state) => state.loggedIn.token);
  console.log(token, "esssssssssssssssssssssssssssssss");
  const [userParkings, setUserParkings] = useState([]);
  useEffect(() => {
    axiosInstanceParking
      .get(`/parkings/myparks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserParkings(res.data.doc);
        console.log(res.data.doc);
      })
      .catch((err) => {
        console.error("Error during parkings request:", err);
      });
  }, []);
  console.log(token, userParkings);

  return (
    <>
      {userParkings.map((parking, index) => (
        <div key={parking._id} className="mb-3  w-100 d-flex row">
          <div className=" d-flex   w-100   pb-2 border-bottom justify-content-between">
            <div className="col-3">
              <div id={`carouselExampleInterval${index}`} className=" w-100 carousel rounded " data-bs-ride="carousel">
                <div className="carousel-inner  ">
                  {parking.photos.map((photo, index) => (
                    <div className="carousel-item  active" data-bs-interval="10000" key={index}>
                      <img
                        src={`${axiosInstanceParking.defaults.baseURL}/parkings/${photo}`}
                        style={{ width: "3vh", height: "18vh" }}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carouselExampleInterval${index}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carouselExampleInterval${index}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-lg-8 pe-3 col-sm-12 d-lg-flex gap-4">
              <div className="col-lg-6 col-sm-12  align-items-center">
                <h5> {parking.title}</h5>
                <p className="mb-0 customfs  ">
                  <span className=" fw-semibold">العنوان: </span>
                  {parking.address}
                </p>
                <p className="mb-0 customfs  ">
                  <span className=" fw-semibold"> السعة: </span>
                  {parking.capacity}
                </p>
                <p className="">
                  <small className="text-body-secondary">
                    تمت الإضافة : {new Date(parking.createdAt).toLocaleDateString()}
                  </small>
                </p>
                <p className="">
                  <small className="text-body-secondary">
                    اخر تعديل : {new Date(parking.updatedAt).toLocaleDateString()}
                  </small>
                </p>
              </div>
              <div className=" d-flex gap-2  py-2 w-100 justify-content-between ">
                <div className=" d-lg-flex gap-3 flex-lg-column  text-center ">
                  <div
                    className={`badge px-4 rounded-pill ${
                      parking.status === "approved"
                        ? "bgColor bg-opacity-75"
                        : parking.status === "pending"
                        ? " bg-secondary bg-opacity-50"
                        : "bg-danger bg-opacity-75"
                    }`}
                  >
                    {parking.status}
                  </div>
                  <div className="d-flex flex-row  justify-content-center ">
                    <StarRating />
                  </div>
                </div>
                <div className="dropdown">
                  <Link
                    className="btn btn-outline-warning dropdown-toggle text-black"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    أجراءات
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={`/Profile/parking/${parking._id}`}>
                        تعديل
                      </Link>
                    </li>
                    {parking.disabled ? (
                      <li className="dropdown-item">إعادة تنشيط</li>
                    ) : (
                      <li className="dropdown-item">إلغاء تنشيط</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
