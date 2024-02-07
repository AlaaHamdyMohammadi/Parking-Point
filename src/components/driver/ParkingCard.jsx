// import { Link } from "react-router-dom";

// import Carousel from "./carousel";

// import { Link } from "react-router-dom";
import { parkingplaces } from './../parkingplaces';

export default function ParkingCard() {
  return (
    <>
      {parkingplaces.map((item, index) => (
        // return (
        <>
          <div key={item.id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
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
              <div className="col-md-8 d-flex flex-row  align-items-center">
                <div className="card-body ">
                  <div className="card-title fw-bolder fs-3">{item.title}</div>
                  {/* <p className="card-text">{item.subtitle}</p> */}
                  <div className="mb-0">
                    <div>
                      <span className="fw-bolder fs-5">السعة: </span>
                      {item.capacity} أماكن
                    </div>
                    <div>
                      <span className="fw-bolder fs-5 ">عدد الأماكن المتاحه: </span>
                      {item.avaliable} أماكن
                    </div>
                  </div>
                </div>
                <div className="ms-2">
                  <button className={`text-center submit w-100 px-3 border rounded-3 fs-5 fw-bold text-white `}>
                    احجز المواقف
                  </button>
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
