import classes from "./../../styles/formStyles.module.css";
import { parkingplaces } from "../home/parkingplaces";
import StarRating from "./StarRating";

export default function ParkingCard() {
  return (
    <>
      {parkingplaces.map((item, index) => (
        <div key={item.id} className="card mb-3">
          <div className="col-lg-12 col-md-4 col-sm-12">
            <div id={`carouselExampleInterval${index}`} className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img style={{ width: "2vh", height: "18vh" }} src={item.imgpath[0]} className="d-block  w-100" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img style={{ width: "2vh", height: "18vh" }} src={item.imgpath[1]} className="d-block  w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img style={{ width: "2vh", height: "18vh" }} src={item.imgpath[2]} className="d-block w-100" alt="..." />
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
          <div className="col-lg-12 d-flex  flex-row  align-items-center">
            <div className="card-body col-lg-8 ">
              <div className="card-title fw-bolder fs-5">{item.title}</div>\{" "}
              <div className="mb-0">
                <div>
                  <span className=" "> الأماكن المتاحه: </span>
                  {item.avaliable} 55
                </div>
              </div>
              <div className="mb-0">
                <div>
                  <span className=" "> العنوان: </span>
                  {item.adsress} شارع الف,اديه /مسقط
                </div>
              </div>
            </div>
            <div className=" col-lg-3 d-flex flex-column gap-2 text-center ms-2">
              <div className="d-flex flex-row  text-center">
                <StarRating />
              </div>
              <div className={`text-center w-75 bgColor text-white  p-0 btn mb-2 ${classes.formBtn}`}>احجز</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
