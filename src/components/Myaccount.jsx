import React from "react";
import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
export default function Myaccount() {
  return (
    <>
      {/* الملف الشخصي */}
      <div className="row align-self-start w-100">
        <div className=" mt-5 ">
          <p className="fs-1 fw-bolder m-2 py-4 "> البيانات الشخصية </p>

          <div className="  p-2 ">
            <p className="fs-2 fw-bold ">
              <span className="p-2">
                <FaUserPen />
              </span>
              الاسم
            </p>
            <p className="fs-5   ">اسراء فتحي احمد</p>
            <div className=" border-bottom w-50 "></div>
          </div>
          <div className="  p-2 ">
            <p className="fs-2 fw-bold ">
              <span className="p-2">
                <MdEmail />
              </span>
              الايميل
            </p>
            <p className="fs-5   ">esraa@gmail.com</p>
            <div className=" border-bottom w-50 "></div>
          </div>
          <div className=" p-2 ">
            <p className="fs-2 fw-bold ">
              <span className="p-2">
                <FaPhone />
              </span>
              الهاتف
            </p>
            <p className="fs-5 fw-bold ">01023456789</p>
            <div className=" border-bottom w-50 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
