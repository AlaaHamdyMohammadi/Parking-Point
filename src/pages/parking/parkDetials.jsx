/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import SpinnerLoad from "../../components/spinner/Spinner";
import ParkLocation from "./ParkLocation";
import ParkRating from "./ParkRating";
import { FaStar } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ParkDetials = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [parkreserved, setParkreserved] = useState({});
  const token = useSelector((state) => state.loggedIn.token);

  let query = useQuery();
  let from = query.get("from");
  let to = query.get("to");
  let price = query.get("price");
  let newParkId = query.get("newParkId");
  useEffect(() => {
    const getReservedPark = async () => {
      try {
        const res = await axiosInstanceParking.get(`/parkings/${newParkId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParkreserved(res.data.park);
      } catch (err) {
        console.error("Error :", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
        }
      }
    };

    if (newParkId) {
      getReservedPark();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [newParkId, token]);

  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (from && to) {
      calculateTimeDifference();
    }
  }, [from, to]);

  const calculateTimeDifference = () => {
    const startTime = new Date(from).getTime();
    const endTime = new Date(to).getTime();

    const timeDifference = Math.abs(endTime - startTime);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    setTimeDifference({ hours, minutes, days });
  };
  const ComponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "الحجوزات",
    onAfterPrint: () => toast.success(" pdf تم الحفظ الملف "),
  });
  return (
    <div>
      <>
        <Helmet>
          <title>Parking Point | تفاصيل الحجز</title>
        </Helmet>
        {isLoading ? (
          <SpinnerLoad />
        ) : (
          <div className="d-flex justify-content-center ">
            <div className="w-75 my-5">
              <div className="d-flex justify-content-between gap-4 my-4">
                <button
                  className={`text-center my-2  borderCustom w-50 animate    btn `}
                  onClick={generatePDF}
                >
                  <FaRegFilePdf className="text-center   fs-5" /> تحميل
                </button>
                {/* <div className=" fw-bold"> العوده الي الصفحة الرئيسية ...</div> */}

                {/* <div className="pointer fs-5  "> */}
                <button
                  className={`text-center text-black my-2 borderCustom w-50 animate    btn `}
                >
                  <Link to="/" className="nonLine">
                    <p className=" text-black">
                      الصفحة الرئيسية
                      <IoArrowRedoCircleOutline className="text-center mx-3 text-black fs-5" />
                    </p>
                  </Link>
                </button>
                {/* <IoArrowRedoCircleOutline className="text-black" /> */}
                {/* </div> */}
              </div>

              <div className={`card text-center borderCustom p-2 mb-5`}>
                <div className="row mx-5 p-3">
                  <div
                    id="carouselExampleRide"
                    className="carousel slide f"
                    data-bs-ride="true"
                  >
                    <div className="carousel-inner">
                      {parkreserved &&
                        parkreserved.photos &&
                        parkreserved.photos.map((photo, index) => (
                          <div
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                            key={index}
                          >
                            <img
                              src={`${axiosInstanceParking.defaults.baseURL}/img/parkings/${photo}`}
                              style={{ height: "50vh", width: "30vh" }}
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                        ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselExampleRide`}
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
                      data-bs-target={`#carouselExampleRide`}
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
                <div ref={ComponentPDF}>
                  <h4 className={`text-center`}>بيانات الحجز:</h4>
                  <div className="row  m-2  justify-content-center">
                    <div className=" col-12 col-md-5  m-2 customRange text-center p-2 fw-semibold rounded-2">
                      من: {from ? new Date(from).toLocaleString() : ""}
                    </div>
                    <div className=" col-12 col-md-5 m-2 customRange align-self-center text-center p-2 fw-semibold rounded-2">
                      إلي: {to ? new Date(to).toLocaleString() : ""}
                    </div>

                    <div className="col-12 col-md-5 m-2 customRange text-center p-2 fw-semibold rounded-2">
                      {timeDifference.minutes > 0 ||
                      timeDifference.hours > 0 ||
                      timeDifference.days > 0
                        ? `مدة الحجز: ${timeDifference.days} يوم, ${timeDifference.hours} ساعة, ${timeDifference.minutes} دقيقة`
                        : " مدة الركن"}
                    </div>
                    <div className=" col-12 col-md-5 m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                      التكلفة: {price} $
                    </div>
                  </div>
                  <h4 className={`text-center`}>بيانات الموقف:</h4>
                  <div className="row  m-2  justify-content-center">
                    <div className=" col-12 col-md-5  m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                      {parkreserved.title}
                    </div>
                    <div className=" col-12 col-md-5 m-2 customRange    align-self-center text-center   p-2 fw-semibold   rounded-2">
                      {parkreserved.city}
                    </div>
                    <div className=" col-12 col-md-5 m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                      {parkreserved.address}
                    </div>
                    <div className=" col-12 col-md-5 m-2 customRange border-none text-center   p-2 fw-semibold   rounded-2">
                      <div className="d-flex justify-content-evenly align-items-center">
                        <h5 className="fs-5">أضف تقييمك ؟</h5>
                        <ParkRating parkId={parkreserved._id} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-3 px-5 justify-content-center">
                  <ParkLocation
                    location={parkreserved.location}
                    title={parkreserved.title}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ParkDetials;
