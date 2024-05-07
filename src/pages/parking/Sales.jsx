/* eslint-disable react-hooks/exhaustive-deps */
import { LiaCarSideSolid } from "react-icons/lia";
import { LuParkingCircle } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { LuCalendarClock } from "react-icons/lu";
import { PiCalendarCheckBold } from "react-icons/pi";
import SpinnerLoad from "../../components/spinner/Spinner";
import { LiaSearchSolid } from "react-icons/lia";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimplePagination from "../../components/pagination/SimplePagination";
import useLogInUserData from "../../../hook/useLogInUserData";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Sales() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [responseLength, setResponseLength] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reserveSearch, setReserveSearch] = useState("");
  const user = useLogInUserData();
  console.log("user: ", user);
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
            params: params,
          }
        );
        setData(response.data.doc);
        setResponseLength(response.data.allItems);
        console.log(response, "res");
      } else if (user.role == "renter") {
        const response = await axiosInstanceParking.get(
          `/parkings/myparks-reservations?page=${currentPage}`,
          {
            params: params,
          }
        );
        setData(response.data.data);
        setResponseLength(response.data.total);
        console.log(response.data.total);
        // console.log(response, "res");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = useCallback((event) => {
    setReserveSearch(event.target.value);
  }, []);

  useEffect(() => {
    fetchData();
  }, [reserveSearch, currentPage, user]);
  // console.log(data, "dataaaaaaaaaaaa");
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

    return `${days}${t("sales.days")}  ${hours}${t(
      "sales.hours"
    )} ${minutes} ${t("sales.minutes")}`;
  };

  const ComponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "الحجوزات",
    onAfterPrint: () => toast.success(" pdf تم الحفظ الملف "),
  });
  const language = useSelector((state) => state.language.language);

  return (
    <>
      <Helmet>
        <title>Parking Point | الحجوزات</title>
      </Helmet>
      {isLoading ? (
        <SpinnerLoad />
      ) : data ? (
        // && data.length > 0
        <div
          className="w-100 align-self-center"
          style={{ minHeight: "27.8vw" }}
        >
          <div className="d-lg-flex d-md-flex m-2 gap-5 justify-content-between">
            <button
              className={`text-center my-2 btnDownload w-100 animate btn `}
              onClick={generatePDF}
            >
              <FaRegFilePdf className="text-center fs-5" />
              {t("sales.download")}
            </button>
            <button className={`text-center my-2 btnDownload w-100 btn `}>
              {responseLength} {t("sales.reservations")}
            </button>

            {user.role == "driver" && (
              <div className="d-flex w-100 my-2" role="search">
                <input
                  className="form-control  fs-6 btnDownload  opacity-50 text-body-secondary "
                  type="search"
                  placeholder={t("sales.placeholderSearch")}
                  value={reserveSearch}
                  onChange={handleSearch}
                  aria-label="Search"
                />
                <button className="btn btn-outline-warning" type="submit">
                  <LiaSearchSolid />
                </button>
              </div>
            )}
          </div>

          <div ref={ComponentPDF}>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "600px",
              }}
            >
              <table className="table table-hover border my-1 rounded-3">
                <thead className="bgColor border rounded-2 fs-6 text-white fw-bolder py-3">
                  <th className="p-1 px-2 ">
                    <LuParkingCircle className="me-1 mb-1  text-white fs-1 bgColor" />
                    {t("sales.parking")}
                  </th>
                  <th className="p-1 px-2 ">
                    <LiaCarSideSolid className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                    {t("sales.plateNumber")}
                  </th>
                  <th className="p-1 px-2 ">
                    <PiCalendarCheckBold className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                    {t("sales.Bookingduration")}
                  </th>
                  <th className="p-1 px-2 ">
                    <LuCalendarClock className="me-1 mb-1 text-center text-white fs-1 bgColor" />
                    {t("sales.startAndEndDate")}
                  </th>
                  <th className="p-1 px-2 ">
                    <MdPriceCheck className="mb-1 text-center text-white fs-1 bgColor" />
                    {t("sales.cost")}
                  </th>
                </thead>
                {user.role == "driver" ? (
                  <tbody className="pe-2">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4">
                          {item.park && item.park.title
                            ? item.park.title
                            : t("sales.unknown")}
                        </td>
                        <td className="p-4 yellowcolor">
                          <span>{item.plateNumber}</span>
                        </td>

                        <td className="p-4">
                          {calculateTimeDifference(
                            item.time.from,
                            item.time.to
                          )}
                        </td>
                        {/* <td className="p-1">
                          {item.time.from
                            ? new Date(item.time.from).toLocaleString(
                                `  ${language == "ar" ? "ar" : "en"}   `,
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )
                            : ""}
                          <span className="text-warning fs-2 fw-semibold">
                            :
                          </span>
                          {item.time.to
                            ? new Date(item.time.to).toLocaleString(
                                `  ${language == "ar" ? "ar" : "en"}   `,
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )
                            : ""}
                        </td> */}
                        <td className="p-1">
                          {item.time.from
                            ? new Date(item.time.from).toLocaleString(
                                language === "ar" ? "ar" : "en",
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )
                            : ""}
                          <span className="text-warning fs-2 fw-semibold">
                            :
                          </span>
                          {item.time.to
                            ? new Date(item.time.to).toLocaleString(
                                language === "ar" ? "ar" : "en",
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )
                            : ""}
                        </td>

                        <td className="p-4 yellowcolor">{item.price} $</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="pe-2">
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

                        <td className="p-1">
                          {/* {formatDateString(item.reservation.time.from)} : */}
                          {item.reservation.time.from
                            ? new Date(
                                item.reservation.time.from
                              ).toLocaleString("ar", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                // second: "numeric",
                                hour12: true,
                              })
                            : ""}
                          <span className="text-warning fs-2 fw-semibold">
                            :
                          </span>

                          {item.reservation.time.to
                            ? new Date(item.reservation.time.to).toLocaleString(
                                "ar",
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                                  // hour12: true,
                                }
                              )
                            : ""}
                          {/* {formatDateString(item.reservation.time.to)} */}
                        </td>

                        <td className="p-4 yellowcolor">
                          {item.reservation.price} $
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      ) : (
        <div
          className="fs-3 fw-bold text-center "
          style={{ minHeight: "27.8vw" }}
        >
          <p className="my-5 py-5">{t("sales.noReservations")}</p>
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
