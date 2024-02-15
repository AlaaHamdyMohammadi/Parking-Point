// import { Link } from "react-router-dom";

// import Carousel from "./carousel";
import classes from "./../../styles/formStyles.module.css";

// import { Link } from "react-router-dom";
import { parkingplaces } from "../home/parkingplaces";

export default function ParkingCard() {
  return (
    <>
      {parkingplaces.map((item, index) => (
        // return (
        <>
          <div key={item.id} className="card mb-3">
            <div className="d-flex g-0">
              <div className="col-lg-4 col-md-4">
                {/* <img src="./images/park.jpg" className="img-fluid rounded-start" alt="parking" /> */}
                <div id={`carouselExampleInterval${index}`} className="carousel slide" data-bs-ride="carousel">
                  {/* <Carousel imgpath={item.imgpath} /> */}
                  <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                      <img
                        style={{ width: "2vh", height: "18vh" }}
                        src={item.imgpath[0]}
                        className="d-block  w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img
                        style={{ width: "2vh", height: "18vh" }}
                        src={item.imgpath[1]}
                        className="d-block  w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        style={{ width: "2vh", height: "18vh" }}
                        src={item.imgpath[2]}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
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
              <div className="col-lg-8 d-lg-flex  flex-row  align-items-center">
                <div className="card-body col-lg-8 col-md-12 col-sm-12 ">
                  <div className="card-title fw-bolder fs-5">{item.title}</div>
                  {/* <p className="card-text">{item.subtitle}</p> */}
                  <div className="mb-0">
                    <div>
                      <span className="fw-bold ">السعة: </span>
                      {item.capacity} أماكن
                    </div>
                    <div>
                      <span className="fw-bold  ">عدد الأماكن المتاحه: </span>
                      {item.avaliable} أماكن
                    </div>
                  </div>
                </div>
                <div className="ms-2 col-lg-4 col-md-12 col-sm-12 text-center">
                  <div className={`text-center w-75 bgColor text-white  p-0 btn mb-2 ${classes.formBtn}`}>احجز</div>
                </div>
              </div>
            </div>
          </div>
        </>
        // );
      ))}
    </>
  );
}
