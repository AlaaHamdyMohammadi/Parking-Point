import React from "react";

export default function Carousel({ imgpath }) {
  return (
    <>
      <div className="carousel-inner">
        <div className="carousel-item active border rounded-2" data-bs-interval="10000">
          <img style={{ width: "2vh", height: "18vh" }} src={imgpath[0]} className="d-block   w-100" alt="..." />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img style={{ width: "2vh", height: "18vh" }} src={imgpath[1]} className="d-block   w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img style={{ width: "2vh", height: "18vh" }} src={imgpath[2]} className="d-block  w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </>
  );
}
