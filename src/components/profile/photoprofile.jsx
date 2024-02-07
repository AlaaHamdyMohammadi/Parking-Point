import React from "react";
// import Accordion from "./Accordion";
import { BsPersonFillCheck } from "react-icons/bs";

export default function Photoprofile() {
  return (
    <>
      <div className="d-flex flex-column position-relative border rounded-3  ">
        <div className="row" style={{ height: "50vh" }}>
          <img src="./../.../../../../public/images/bg2.gif" className="w-100  " style={{ height: "50vh" }} />
        </div>
        {/* <div className=""> */}
        <div className="position-absolute  top-100 start-50 translate-middle  ">
          <img
            src="./../.../../../../public/images/defaultpersonjpg.jpg"
            className="rounded-circle "
            style={{ height: "20vh", width: "20vh" }}
            alt="..."
          />

          <p className="mt-2 Gray">
            <BsPersonFillCheck className="editIcon2 " />
            <span className=""> عضو منذ 5 اسابيع</span>
          </p>
        </div>
      </div>
    </>
  );
}
