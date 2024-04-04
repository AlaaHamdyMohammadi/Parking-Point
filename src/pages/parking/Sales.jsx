import { LiaCarSideSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import SpinnerLoad from "../../components/spinner/Spinner";
import { Helmet } from "react-helmet";
export default function Sales() {
  const [isLoading, setIsLoading] = useState(true);

  const ComponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "الحجوزات",
    onAfterPrint: () => alert("تم الحفظ في ملف pdf"),
  });

  useEffect(function () {
    console.log("work");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Helmet>
        <title>Parking Point | الحجوزات</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <div className="my-5  w-100 align-self-center">
          <div>
            <div ref={ComponentPDF}>
              <button
                className={`text-center  btnDownload w-25 animate  m-2 btn `}
                onClick={generatePDF}
              >
                <FaRegFilePdf className="text-center   fs-5" /> تحميل
              </button>
              {/* maxWidth: "700px" */}
              <div
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "600px",
                }}
              >
                <table className="table table-hover border rounded-3">
                  <thead className="bgColor border rounded-2 fs-5 text-white fw-bolder py-3">
                    <th className="p-1 px-2 fw-bolder">
                      <LuParkingCircle className="me-1 mb-1 fw-bolder text-white fs-1 bgColor" />
                      الموقف
                    </th>
                    <th className="p-1 px-2 fw-bolder">
                      <LiaCarSideSolid className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                      رقم اللوحة
                    </th>
                    <th className="p-1 px-2 fw-bolder">
                      <MdOutlineWatchLater className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                      الساعة{" "}
                    </th>
                    <th className="p-1 px-2 fw-bolder">
                      <MdPriceCheck className="mb-1 text-center text-white fs-1 bgColor" />
                      التكلفة
                    </th>
                    <th className="p-1 px-2 fw-bolder">
                      <SlCalender className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                      التاريخ
                    </th>
                  </thead>
                  <tbody className="pe-2">
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">5 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">88 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>
                    {/*  */}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>{" "}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>{" "}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>{" "}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>{" "}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>{" "}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>{" "}
                    <tr>
                      <td className="p-4">الموقف الاول</td>
                      <td className="p-4">
                        <span>123456</span>
                      </td>
                      <td className="p-4">7pm : 5pm</td>
                      <td className="p-4">100 $</td>
                      <td className="p-4">9-2-2024 : 9-2-2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
