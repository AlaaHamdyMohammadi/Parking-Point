/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ModalReserve from "./ReserveModal";
import { FaStar } from "react-icons/fa";
import axiosInstanceParking from "../../axiosConfig/instanc";

export default function ParkingCard({ AvaliableParksFilter }) {
  console.log(AvaliableParksFilter);
  return (
    <>
      {AvaliableParksFilter.map((item, index) => (
        <div key={item._id} className="card d-flex flex-row mb-3">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div id={`carouselExampleInterval${index}`} className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    style={{ width: "3vh", height: "18vh" }}
                    src={`/images/homeimg.jpg`}
                    className="d-block  w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img
                    style={{ width: "3vh", height: "18vh" }}
                    src={`/images/park.jpg`}
                    className="d-block  w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    style={{ width: "3vh", height: "18vh" }}
                    src={`/images/backgroundjpg.jpg`}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              {/* <div className="carousel-inner  ">
                {item.photos.map((photo, index) => (
                  <div className="carousel-item  active" data-bs-interval="10000" key={index}>
                    <img
                      src={`${axiosInstanceParking.defaults.baseURL}/parkings/${photo}`}
                      style={{ width: "3vh", height: "18vh" }}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                ))}
              </div> */}
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
          <div className="col-8 d-flex    align-items-center">
            <div className="card-body col-lg-8 ">
              <div className="card-title fw-bolder mb-0">{item.title}</div>
              <div className="mb-0 customfs  Gray">
                <div>
                  <span className=" fw-semibold"> الأماكن المتاحه: </span>
                  {item.avaliable} 55
                </div>
              </div>
              <div className="mb-0 customfs Gray">
                <div>
                  <span className=" fw-semibold"> العنوان: </span>
                  {item.address}
                </div>
              </div>
            </div>
            <div className=" col-lg-3 d-lg-flex gap-1 flex-lg-column justify-content-start text-center ">
              <div className="ps-2">
                <ModalReserve />
                {/* <div className={`text-center  w-75 bgColor text-white  p-0  btn  ${classes.formBtn}`}>احجز</div> */}
              </div>
              <div className="d-flex flex-row  text-center justify-content-start ">
                <RatingComponent rating={item.rate} />
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
