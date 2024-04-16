import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import SpinnerLoad from "../../components/spinner/Spinner";

const ParkDetials = () => {
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector((state) => state.loggedIn.token);
  const { parkId } = useParams();
  //   const { parkId } = useParams();
  useEffect(() => {
    // alert(parkId);
    const editParking = async () => {
      try {
        const res = await axiosInstanceParking.get(`/parkings/${parkId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
      } catch (err) {
        console.error("Error :", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
        }
      }
    };

    if (parkId) {
      editParking(); // Invoke editParking only if parkId exists
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [parkId, token]);
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
            <div className="w-75 my-5 ">
              <div className="d-flex justify-content-between  my-4">
                {/* <div className="fs-5 fw-bolder">اختر الموقف المناسب</div> */}
                <div className=" fw-bold">المواقف الأقرب لك ....</div>
                <div className="pointer fs-5  ">
                  <Link to="/">
                    <IoArrowRedoCircleOutline />
                  </Link>
                </div>
              </div>
              {/* <div className="  "> */}
              <div className={`card text-center borderCustom p-2 mb-5`}>
                {/* <div className={``}> */}
                <div className="row ">
                  <div
                    id="carouselExampleRide"
                    className="carousel slide f"
                    data-bs-ride="true"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          style={{ height: "50vh", width: "30vh" }}
                          src="./../../../public/images/404-error.png"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{ height: "50vh", width: "30vh" }}
                          src="./../../../public/images/Notify-amico (1).png"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{ height: "50vh", width: "30vh" }}
                          src="./../../../public/images/Rectangle4.png"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleRide"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      //   style={{ color: "green" , background: "green" }}
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleRide"
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
                <h4 className={`4 text-center`}>بيانات الحجز:</h4>
                <div className="row p-2 my-2 g  justify-content-center">
                  <div className=" col-12 col-md-5  m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                    esraa Lorem,
                    {/* ipsum dolor sit amet consectetur adipisicing */}
                    {/* elit. Officiis, ipsam velit aperiam maiores soluta possimus? */}
                  </div>
                  <div className=" col-12 col-md-5 m-2 customRange    align-self-center text-center   p-2 fw-semibold   rounded-2">
                    esraa
                  </div>
                  <div className=" col-12 col-md-5 m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                    esraa
                  </div>
                  <div className=" col-12 col-md-5 m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                    esraa
                  </div>
                </div>
                <h4 className={`4 text-center`}>بيانات الموقف:</h4>
                <div className="row p-2 my-2  justify-content-center">
                  <div className=" col-12 col-md-5  m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                    esraa Lorem,
                    {/* ipsum dolor sit amet consectetur adipisicing */}
                    {/* elit. Officiis, ipsam velit aperiam maiores soluta possimus? */}
                  </div>
                  <div className=" col-12 col-md-5 m-2 customRange    align-self-center text-center   p-2 fw-semibold   rounded-2">
                    esraa
                  </div>
                  <div className=" col-12 col-md-5 m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                    esraa
                  </div>
                  <div className=" col-12 col-md-5 m-2 customRange     text-center   p-2 fw-semibold   rounded-2">
                    esraa
                  </div>
                </div>
                <div className="row  my-5  bg-warning justify-content-center">
                  mapppppppp
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ParkDetials;
