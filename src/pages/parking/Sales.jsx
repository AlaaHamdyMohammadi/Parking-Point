import { LiaCarSideSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { LuCalendarClock } from "react-icons/lu";
// import { GrValidate } from "react-icons/gr";
import { PiCalendarCheckBold } from "react-icons/pi";
import SpinnerLoad from "../../components/spinner/Spinner";

const calculateTimeDifference = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const differenceInMilliseconds = Math.abs(to - from);

  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} يوم ${hours} ساعة ${minutes} دقيقة`;
};
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}T${hours}:${minutes}`;
};
export default function Sales() {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.loggedIn.token);
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstanceParking.get("/reserve/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data.doc);
        console.log(response, "res");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(data, "data");
  //Download
// export default function Sales() {
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
   {isLoading ? <SpinnerLoad/> : <div className="my-5  w-100 align-self-center">
      <div>
        <div ref={ComponentPDF}>
          <button
            className={`text-center  btnDownload w-25 animate  m-2 btn `}
            onClick={generatePDF}
          >
            <FaRegFilePdf className="text-center   fs-5" /> تحميل
          </button>
          <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "600px" }}>
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
                  <PiCalendarCheckBold className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                  مدة الحجز
                </th>
                <th className="p-1 px-2 fw-bolder">
                  <LuCalendarClock className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                  بداية الحجز : نهاية الحجز
                </th>
                <th className="p-1 px-2 fw-bolder">
                  <MdPriceCheck className="mb-1 text-center text-white fs-1 bgColor" />
                  التكلفة
                </th>
              </thead>
              <tbody className="pe-2">
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="p-4">item.park</td>
                      <td className="p-4 yellowcolor">
                        <span>{item.plateNumber}</span>
                      </td>
                      <td className="p-4">{calculateTimeDifference(item.time.from, item.time.to)}</td>
                      <td className="p-4">
                        {formatDateString(item.time.from)} : {formatDateString(item.time.to)}
                      </td>
                      <td className="p-4 yellowcolor">{item.price} $</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>}
    </>
  );}
