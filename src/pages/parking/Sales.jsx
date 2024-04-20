/* eslint-disable react-hooks/exhaustive-deps */
import { LiaCarSideSolid } from "react-icons/lia";
// import { SlCalender } from "react-icons/sl";
// import { MdOutlineWatchLater } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { LuCalendarClock } from "react-icons/lu";
import { PiCalendarCheckBold } from "react-icons/pi";
import SpinnerLoad from "../../components/spinner/Spinner";
import { LiaSearchSolid } from "react-icons/lia";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimplePagination from "../../components/pagination/SimplePagination";
import useLogInUserData from "../../../hook/useLogInUserData";
const calculateTimeDifference = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const differenceInMilliseconds = Math.abs(to - from);

  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${days} يوم ${hours} ساعة ${minutes} دقيقة`;
};

// const formatDateString = (dateString) => {
//   const date = new Date(dateString);
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   return `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${date
//     .getDate()
//     .toString()
//     .padStart(2, "0")}T${hours}:${minutes}`;
// };

export default function Sales() {
  const [currentPage, setCurrentPage] = useState(1);
  const [responseLength, setResponseLength] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reserveSearch, setReserveSearch] = useState("");
  const user = useLogInUserData();
  const token = useSelector((state) => state.loggedIn.token);

  const fetchData = async () => {
    try {
      let params = {};
      if (reserveSearch) {
        params = { searchField: "plateNumber", plateNumber: reserveSearch };
      }
      if (user.role == "driver") {
        const response = await axiosInstanceParking.get(
          `/reserve/me?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: params,
          }
        );
        setResponseLength(response.data.allItems);
        setData(response.data.doc);
        console.log(response.data, "res");
      } else if (user.role == "renter") {
        const response = await axiosInstanceParking.get(
          `/parkings/myparks-reservations?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: params,
          }
        );
        setResponseLength(response.data.allItems);
        setData(response.data.data);
        console.log(response.data, "res");
      }
    } catch (error) {
      toast.error("حدث خطأ ! برجاء المحاولة في وقت لاحق");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(responseLength);
  // Use useCallback to memoize the handleSearch function
  const handleSearch = useCallback((event) => {
    setReserveSearch(event.target.value);
  }, []);

  useEffect(() => {
    fetchData();
  }, [token, reserveSearch, currentPage]);
  console.log(data, "dataaaaaaaaaaaa");
  const ComponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "الحجوزات",
    onAfterPrint: () => toast.success(" pdf تم الحفظ الملف "),
  });

  return (
    <>
      <Helmet>
        <title>Parking Point | الحجوزات</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : data && data.length > 0 ? (
        <div className="my-5  w-100 align-self-center">
          <div className="d-lg-flex d-md-flex m-2 gap-5 justify-content-between">
            <button
              className={`text-center my-2 btnDownload w-100 animate    btn `}
              onClick={generatePDF}
            >
              <FaRegFilePdf className="text-center   fs-5" /> تحميل
            </button>
            <div className="d-flex w-100 my-2" role="search">
              <input
                className="form-control  fs-6 btnDownload  opacity-50 text-body-secondary "
                type="search"
                placeholder="ابحث برقم اللوحة"
                //  onChange={(e) => search(e.target.value)}
                value={reserveSearch}
                onChange={handleSearch}
                aria-label="Search"
              />
              <button className="btn btn-outline-warning" type="submit">
                <LiaSearchSolid />
              </button>
            </div>
          </div>

          <div ref={ComponentPDF}>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "600px",
              }}
            >
              <table className="table table-hover border my-3 rounded-3">
                <thead className="bgColor border rounded-2 fs-6 text-white ">
                  <th className="p-1 ">
                    <LuParkingCircle className="me-1 mb-1  text-white fs-2 bgColor" />
                    الموقف
                  </th>
                  <th className="p-1 ">
                    <LiaCarSideSolid className="me-1 mb-1 text-center text-white fs-2 bgColor" />
                    رقم اللوحة
                  </th>
                  <th className="p-1 ">
                    <PiCalendarCheckBold className="me-1 mb-1 text-center text-white fs-2 bgColor" />
                    مدة الحجز
                  </th>
                  <th className="p-1 ">
                    <LuCalendarClock className="me-1 mb-1 text-center text-white fs-2 bgColor" />
                    بداية الحجز:
                  </th>
                  <th className="p-1 ">
                    <LuCalendarClock className="me-1 mb-1 text-center text-white fs-2 bgColor" />
                    نهاية الحجز:
                  </th>
                  <th className="p-1 ">
                    <MdPriceCheck className="mb-1 text-center text-white fs-2 bgColor" />
                    التكلفة
                  </th>
                </thead>
                {user.role === "renter" ? (
                  <tbody className="p">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4">{item.park.title}</td>
                        <td className="p-4 yellowcolor">
                          <span>{item.reservation.user.plateNumber}</span>
                        </td>
                        <td className="p-4">
                          {calculateTimeDifference(
                            item.reservation.time.from,
                            item.reservation.time.to
                          )}
                        </td>
                        <td className="p-4">
                          {item.reservation.time.from
                            ? new Date(
                                item.reservation.time.from
                              ).toLocaleString()
                            : ""}
                        </td>
                        <td className="p-4">
                          {item.reservation.time.to
                            ? new Date(
                                item.reservation.time.to
                              ).toLocaleString()
                            : ""}
                          {/* {formatDateString(item.time.from)} : {formatDateString(item.time.to)} */}
                        </td>
                        <td className="p-4 yellowcolor">
                          {item.reservation.price} $
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="p">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4">{item.park.title}</td>
                        <td className="p-4 yellowcolor">
                          <span>{item.plateNumber}</span>
                        </td>
                        <td className="p-4">
                          {calculateTimeDifference(
                            item.time.from,
                            item.time.to
                          )}
                        </td>
                        <td className="p-4">
                          {item.time.from
                            ? new Date(item.time.from).toLocaleString()
                            : ""}
                        </td>
                        <td className="p-4">
                          {item.time.to
                            ? new Date(item.time.to).toLocaleString()
                            : ""}
                          {/* {formatDateString(item.time.from)} : {formatDateString(item.time.to)} */}
                        </td>
                        <td className="p-4 yellowcolor">{item.price} $</td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {/*  */}
              </table>
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={50000} />
        </div>
      ) : (
        <div className="fs-3 fw-bold text-center ">
          <p className="my-5 py-5">لا يوجد حجوزات حتى الان </p>
        </div>
      )}
      <SimplePagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pagesPagination={responseLength}
      />
    </>
  );
}
