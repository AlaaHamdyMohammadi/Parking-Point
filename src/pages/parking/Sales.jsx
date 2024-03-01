import { LiaCarSideSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";

import { MdPriceCheck } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import classes from "./../../styles/formStyles.module.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
export default function Sales() {
  const ComponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "الحجوزات",
    onAfterPrint: () => alert("تم الحفظ في ملف pdf"),
  });
  return (
    <div className="mt-5 w-90  align-self-center ">
      <div className="table-responsive">
        <div ref={ComponentPDF}>
          <button className={` text-center bgColor w-25 text-white btn m-2 ${classes.formBtn}`} onClick={generatePDF}>
            <FaRegFilePdf className=" text-center   text-white fs-5 " /> تحميل
          </button>
          <table className="table table-hover border rounded-3  ">
            <thead className="bgColor  border rounded-2  fs-5 text-white fw-bolder  py-3">
              <th className="p-1 px-2 fw-bolder ">
                <LuParkingCircle className="me-1 mb-1 fw-bolder  text-white fs-1 bgColor" />
                الموقف
              </th>
              <th className="p-1 px-2 fw-bolder">
                <LiaCarSideSolid className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                رقم اللوحة
              </th>
              <th className="p-1 px-2 fw-bolder">
                <MdOutlineWatchLater className="me-1 mb-1 text-center  text-white fs-1 bgColor" />
                الساعة{" "}
              </th>
              <th className="p-1 px-2 fw-bolder ">
                <MdPriceCheck className=" mb-1 text-center   text-white fs-1 bgColor" />
                التكلفة
              </th>
              <th className="p-1 px-2 fw-bolder ">
                <SlCalender className="me-1 mb-1 text-center   text-white fs-1 bgColor" />
                التاريخ
              </th>
              {/* <th className="p-1 px-2 fw-bolder " onClick={generatePDF}>
              </th> */}
              {/* <td onClick={generatePDF} className="py-1">
              {/* <button className=" btn-yellow rounded-3">تحميل الملف PDF</button> */}
              {/* <button className={`submit  w-75 backgroundColor text-center btn-yellow rounded-3  fw-bold `}> PDF</button> */}
              {/* </td> */}
              {/* <th className="p-3">تاريخ الحجز</th> */}
            </thead>
            <tbody className="pe-2">
              <tr>
                <td className="p-4   ">الموقف الاول</td>
                <td className="p-4 ">
                  <span>123456</span>
                </td>
                <td className="p-4 ">7pm : 5pm</td>
                <td className="p-4 ">5 $</td>

                <td className="p-4 ">9-2-2024 : 9-2-2024</td>
              </tr>
              <tr>
                <td className="p-4   ">الموقف الاول</td>
                <td className="p-4 ">
                  <span>123456</span>
                </td>
                <td className="p-4 ">7pm : 5pm</td>
                <td className="p-4 ">88 $</td>

                <td className="p-4 ">9-2-2024 : 9-2-2024</td>
              </tr>
              <tr>
                <td className="p-4   ">الموقف الاول</td>
                <td className="p-4 ">
                  <span>123456</span>
                </td>
                <td className="p-4 ">7pm : 5pm</td>
                <td className="p-4 ">100 $</td>

                <td className="p-4 ">9-2-2024 : 9-2-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <div className="table-responsive">
    //   <table className="table table-striped table-hover">
    //     <thead>
    //       <tr>
    //         <th scope="col">#</th>
    //         <th scope="col">First</th>
    //         <th scope="col">Last</th>
    //         <th scope="col">Handle</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <th scope="row">1</th>
    //         <td>Mark</td>
    //         <td>Otto</td>
    //         <td>@mdo</td>
    //       </tr>

    //       <tr>
    //         <th scope="row">2</th>
    //         <td>Jacob</td>
    //         <td>Thornton</td>
    //         <td>@fat</td>
    //       </tr>
    //       <tr>
    //         <th scope="row">3</th>
    //         <td colSpan="2">Larry the Bird</td>
    //         <td>@twitter</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  );
}
