import { Link } from "react-router-dom";
import StarRating from "../driver/StarRating";
import { useEffect } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

export default function ParkingCard({ userParkings, setUserParkings }) {
  const token = useSelector((state) => state.loggedIn.token);
  function getMyParkings() {
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
  }
  useEffect(() => {
    getMyParkings()
  }, []);
  function isDisabled(ParkingId, disabled) {
    const formData = new FormData();
    formData.append("disabled", disabled);
    axiosInstanceParking
      .patch(`/parkings/${ParkingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("update request successful", res.data);
        getMyParkings()
      })
      .catch((err) => {
        console.error("Error during parking request:", err);
      });
  }
  return (
    <>
      {userParkings.map((parking, index) => (
        <div key={parking._id} className={`mb-3 w-100 d-flex ${parking.disabled == true ? 'bg-secondary bg-opacity-25' : ''}`}>
          <div className="d-md-flex w-100 pb-2 border-bottom justify-content-between">
            <div className="d-none d-md-block fw-bold mt-5">{index + 1}</div>
            <div className="col-md-3 col-12">
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
                <h5>{parking.title}</h5>
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
                    className={`badge px-4 rounded-pill ${parking.disabled==true?'bg-secondary bg-opacity-50':(parking.status === "approved"
                        ? "bgColor bg-opacity-75"
                        : parking.status === "pending"
                          ? " bg-secondary bg-opacity-50"
                          : "bg-danger bg-opacity-75")
                      }`}
                  >
                    {parking.disabled==true?'غير نشط':
                    (parking.status == "pending" ? "قيد الانتظار" : parking.status == "approved" ? "نشط" : "مرفوض")}
                    <>
                    {/* {parking.status == "pending" ? "قيد الانتظار" : parking.status == "approved" ? "نشط" : "مرفوض"} */}
                    </>
                  </div>
                  <div className="d-flex flex-row  justify-content-center ">
                    <RatingComponent rating={parking.rate} />
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
                    {parking.status == 'approved' &&
                      < >
                        {parking.disabled ?
                          <li className="dropdown-item" role="button" onClick={() => { isDisabled(parking._id, false) }}>إعادة تنشيط</li> :
                          <li className="dropdown-item" role="button" onClick={() => { isDisabled(parking._id, true) }}>إلغاء تنشيط</li>}
                      </>
                    }
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
function RatingComponent({ rating }) {
  const starArr = (length) => Array.from({ length }, (_, i) => i);

  return (
    <div>
      {[...starArr(rating)].map((_, index) => (
        <FaStar key={index} size={"0.7em"} className="yellowcolor" />
      ))}
      {[...starArr(5 - rating)].map((_, index) => (
        <FaStar key={index + rating} size={"0.7em"} className="Gray" />
      ))}
    </div>
  );
}
