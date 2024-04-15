/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ModalReserve from "./ReserveModal";

import RatingComponent from "./RatingComponent";
import axiosInstanceParking from "../../axiosConfig/instanc";

export default function ParkingCard({ AvaliableParksFilter, ReserveTime }) {
  console.log(AvaliableParksFilter);
  return (
    <>
      {AvaliableParksFilter.map((item, index) => (
        <div key={item._id} className="card d-flex flex-row mb-3">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div
              id={`carouselExampleInterval${index}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner  ">
                {item.photos.map((photo, index) => (
                  <div
                    className="carousel-item  active"
                    data-bs-interval="10000"
                    key={index}
                  >
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
                <ModalReserve ParkId={item._id} ReserveTime={ReserveTime} />
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
