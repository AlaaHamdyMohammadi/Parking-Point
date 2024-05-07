/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstanceParking from "../axiosConfig/instanc";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SuccessPayment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [parkId, setParkId] = useState("");
  useEffect(() => {
    const handlePayment = async () => {
      try {
        const ReserveResponse = await axiosInstanceParking.post(
          `/reserve/confirm-reservation`,
          {
            sessionId: localStorage.getItem("sessionID"),
          }
        );
        localStorage.removeItem("sessionID");

        const newParkId = ReserveResponse.data.reserve.park;
        const From = ReserveResponse.data.reserve.time.from;
        const To = ReserveResponse.data.reserve.time.to;
        const price = ReserveResponse.data.reserve.price;

        setParkId(newParkId);
        setTimeout(() => {
          navigate(
            `/ParkDetials?from=${From}&to=${To}&price=${price}&newParkId=${newParkId}`
          );
        }, 2000);
      } catch (err) {
        toast.error(t("successPaymentError"));
        console.error("Error :", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
        }
      }
    };

    handlePayment();
  }, [navigate]);

  return (
    <>
      <div
        className="vh-75 d-flex justify-content-center align-items-center my-5"
        style={{ minHeight: "95vw" }}
      >
        <div className="col-md-4">
          <div className="border border-3 border-success"></div>
          <div className="card  bg-white shadow p-5">
            <div className="mb-4 text-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                color="#198754"
                fill="currentColor"
                className=" text-success bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>
            </div>
            <div className="text-center ">
              <h2>{t("successPayment1")}</h2>
              <p>{t("successPayment11")}</p>
              <p>{t("successPayment2")}</p>
              <p>{t("successPayment3")}</p>
              <Spinner animation="border" variant="success" size="lg" />
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default SuccessPayment;
