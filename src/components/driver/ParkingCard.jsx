/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalReserve from "./ReserveModal";

import RatingComponent from "./RatingComponent";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ParkingCard({ AvaliableParksFilter, ReserveTime }) {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);

  //console.log(AvaliableParksFilter);
  return (
    <>
      {AvaliableParksFilter.map((item, index) => (
        <div key={item._id} className="card d-flex flex-row mb-3">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div
              id={`carouselExampleInterval${index}`}
              className="carousel slide mt-3 me-2"
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
                      src={`${axiosInstanceParking.defaults.baseURL}/img/parkings/${photo}`}
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
          <div className="col-8 d-lg-flex  align-items-center">
            <div className="card-body col-lg-8">
              <div className="card-title fw-bolder mb-0">{item.title}</div>
              <div className="mb-0 customfs  ">
                <div>
                  <span className=" fw-semibold">{t("Available")}</span>
                  {item.availableCapacity}
                </div>
              </div>
              <div className="mb-0 customfs ">
                <div>
                  <ParkingAddress address={item.address} />
                </div>
              </div>
            </div>
            <div className=" col-lg-3 col-md-12 d-lg-flex gap-1 flex-lg-column justify-content-start text-center ">
              <div className={`${language == "ar" ? "ps-2" : "pe-2"}`}>
                <ModalReserve ParkId={item._id} ReserveTime={ReserveTime} />
              </div>
              <div
                className={`${
                  language == "ar" ? "ps-2" : "pe-2"
                } d-flex flex-row text-center justify-content-evenly`}
              >
                <RatingComponent rating={item.rate} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
function ParkingAddress({ address }) {
  const [seeMore, setSeeMore] = useState(false);
  const { t } = useTranslation();
  return (
    <p className="mb-0 customfs">
      <div style={{}}>
        <span className="fw-semibold">{t("address")}</span>
        {seeMore
          ? address
          : `${address.slice(0, 20)}${address.length > 20 ? "..." : ""}`}
      </div>

      {address.length > 20 && (
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
          {seeMore ? t("less") : t("more")}
        </button>
      )}
    </p>
  );
}
