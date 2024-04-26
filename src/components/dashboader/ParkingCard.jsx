/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import RatingComponent from "../driver/RatingComponent";
import { useEffect, useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import SpinnerLoad from "../../components/spinner/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ParkingCard({ userParkings, setUserParkings }) {
  const token = useSelector((state) => state.loggedIn.token);
  const [isLoading, setIsLoading] = useState(true);

  function getMyParkings() {
    axiosInstanceParking
      .get(`/parkings/myparks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserParkings(res.data.doc);
      })
      .catch((err) => {
        console.error("Error during parkings request:", err);
      });
  }
  useEffect(() => {
    getMyParkings();
  }, []);
  function isDisabled(ParkingId, disabled) {
    const formData = new FormData();
    formData.append("disabled", disabled);
    axiosInstanceParking
      .patch(`/parkings/${ParkingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getMyParkings();
        if (disabled == false) {
          toast.success("تم إعادة تنشيط الموقف بنجاح! في انتظار المراجعة...");
        } else if (disabled == true) {
          toast.success(" تم إلغاء تنشيط الموقف بنجاح! في انتظار المراجعة...");
        }
      })
      .catch((err) => {
        console.error("Error during parking request:", err);
      });
  }

  useEffect(function () {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <>
          {userParkings && userParkings.length > 0 ? (
            userParkings.map((parking, index) => (
              <div
                key={parking._id}
                className={`pt-3 px-3 rounded w-100 d-flex ${
                  parking.disabled == true ? "bg-secondary bg-opacity-25" : ""
                }`}
              >
                <div className="d-md-flex w-100 pb-2 border-bottom justify-content-between">
                  <div className="d-none d-md-block fw-bold mt-5">
                    {index + 1}
                  </div>
                  <div className="col-md-3 col-12">
                    <div
                      id={`carouselExampleInterval${index}`}
                      className=" w-100 carousel rounded "
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner  ">
                        {parking.photos.map((photo, index) => {
                          return (
                            <div
                              className={`carousel-item ${
                                index === 0 ? "active" : ""
                              }`}
                              data-bs-interval="10000"
                              key={index}
                            >
                              <img
                                src={`${axiosInstanceParking.defaults.baseURL}/img/parkings/${photo}`}
                                style={{ width: "3vh", height: "18vh" }}
                                className="d-block w-100"
                                alt={parking.title}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#carouselExampleInterval${index}`}
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#carouselExampleInterval${index}`}
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <ToastContainer position="top-right" autoClose={2000} />

                  <div className="col-lg-8 pe-3 col-sm-12 d-lg-flex gap-4">
                    <div className="col-lg-6 col-sm-12  align-items-center">
                      <h5>{parking.title}</h5>
                      <p className="mb-0 customfs  ">
                        <ParkingAddress address={parking.address} />
                      </p>
                      <p className="mb-0 customfs  ">
                        <span className=" fw-semibold"> السعة: </span>
                        {parking.capacity}
                      </p>

                      <p className="">
                        <small className="text-body-secondary">
                          الإضافة:{" "}
                          {new Date(parking.createdAt).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                    <div className=" d-flex gap-2  py-2 w-100 justify-content-between ">
                      <div className=" d-lg-flex gap-3 flex-lg-column  text-center ">
                        <div
                          className={`badge px-4 rounded-pill ${
                            parking.disabled == true
                              ? "bg-secondary bg-opacity-50"
                              : parking.status === "approved"
                              ? "bgColor bg-opacity-75"
                              : parking.status === "pending"
                              ? " bg-secondary bg-opacity-50"
                              : "bg-danger bg-opacity-75"
                          }`}
                        >
                          {parking.disabled == true
                            ? "غير نشط"
                            : parking.status == "pending"
                            ? "قيد الانتظار"
                            : parking.status == "approved"
                            ? "نشط"
                            : "مرفوض"}
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
                            <Link
                              className="dropdown-item"
                              to={`/Profile/parking/${parking._id}`}
                            >
                              تعديل
                            </Link>
                          </li>
                          {parking.status == "approved" && (
                            <>
                              {parking.disabled ? (
                                <li
                                  className="dropdown-item"
                                  role="button"
                                  onClick={() => {
                                    isDisabled(parking._id, false);
                                  }}
                                >
                                  إعادة تنشيط
                                </li>
                              ) : (
                                <li
                                  className="dropdown-item"
                                  role="button"
                                  onClick={() => {
                                    isDisabled(parking._id, true);
                                  }}
                                >
                                  إلغاء تنشيط
                                </li>
                              )}
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="fs-3 fw-semibold text-center">
              <p className="my-5 py-5">لا يوجد مواقف حتى الان</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

function ParkingAddress({ address }) {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <p className="mb-0 customfs">
      <div style={{}}>
        <span className="fw-semibold">العنوان: </span>
        {seeMore
          ? address
          : `${address.slice(0, 30)}${address.length > 30 ? "..." : ""}`}
      </div>

      {address.length > 30 && (
        <button
          onClick={() => setSeeMore(!seeMore)}
          style={{
            marginLeft: "10px",
            border: "none",
            background: "none",
            color: "#291336",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          {seeMore ? "عرض الأقل" : "عرض المزيد"}
        </button>
      )}
    </p>
  );
}
