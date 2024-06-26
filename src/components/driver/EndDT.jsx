/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import classes from "./../../styles/register.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { useState } = React;
import { FcOvertime } from "react-icons/fc";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import useSendCode from "../../../hook/useSendCode";
import ConfimEmailPop from "../login-register/confirmEmailpop";
import useLogInUserData from "../../../hook/useLogInUserData";
import { useTranslation } from "react-i18next";

export default function EndDateTime({
  BookNow,
  onReserveChange,
  setIsSearch,
  onTimeChange,
}) {
  const user = useLogInUserData();

  const todayDate = new Date().toISOString().slice(0, 16);

  // console.log("today date", todayDate);
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState({
    city: "",
    from: BookNow ? todayDate : "",
    // Set default value to current date and time if BookNow is true
    to: null,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedData = { ...searchData };
    if (name === "time" || name === "to") {
      updatedData[name] = value;
    } else {
      updatedData[name] = value;
    }

    setSearchData(updatedData);
    onTimeChange(updatedData);
  };

  const calculateTimeDifference = () => {
    const startTime = new Date(searchData.from).getTime();
    const endTime = new Date(searchData.to).getTime();

    if (startTime >= endTime) {
      toast.error("يجب أن يكون تاريخ انتهاء الحجز بعد تاريخ البدء.");
      return;
    }

    const timeDifference = Math.abs(endTime - startTime);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    let adjustedDays = days;
    let adjustedHours = remainingHours;
    let adjustedMinutes = remainingMinutes;

    if (adjustedMinutes >= 60) {
      adjustedHours++;
      adjustedMinutes = 0;
    }

    if (adjustedHours >= 24) {
      adjustedDays++;
      adjustedHours = 0;
    }

    setTimeDifference({
      days: adjustedDays,
      hours: adjustedHours,
      minutes: adjustedMinutes,
    });
  };

  const sendQuery = (e) => {
    e.preventDefault();
    console.log(searchData);
    const startTime = new Date(searchData.from).getTime();
    const endTime = new Date(searchData.to).getTime();
    if (startTime >= endTime) {
      toast.error(t("reservationDate.errorToast1"));
      return;
    }
    if (user.isEmailConfirmed == false) {
      e.preventDefault();
    } else {
      axiosInstanceParking
        .get(
          `/parkings/?city=${searchData.city}&from=${searchData.from}&to=${searchData.to}`
        )
        .then((response) => {
          onReserveChange(response.data.parks);
          console.log("Response:", response.data.parks);
          setIsSearch(true);
        })
        .catch((error) => {
          console.error("Error", error);
          toast.error(t("reservationDate.errorToast2"));
        });
    }
  };
  const language = useSelector((state) => state.language.language);

  const handleChange = useSendCode();
  return (
    <>
      <form method="post" onSubmit={sendQuery}>
        <div className="container">
          <div
            className={`${classes.customSelectWrapper} Gray text-center w-100  mb-2  `}
          >
            <select
              id="cars"
              name="city"
              className={`w-100 Gray focus border-0 rounded-2 p-1 pointer shadow-none customRange  `}
              onChange={handleInputChange}
              value={searchData.city}
            >
              <option value="" hidden className="text-danger">
                {t("addParking.SelectState")}
              </option>
              <option className="text-black" value="مسقط">
                {t("addParking.city1")}
              </option>
              <option className="text-black" value="مطرح">
                {t("addParking.city2")}
              </option>
              <option className="text-black" value="السيب">
                {t("addParking.city3")}
              </option>
              <option className="text-black" value="بوشر">
                {t("addParking.city4")}
              </option>
              <option className="text-black" value="العامرات">
                {t("addParking.city5")}
              </option>
              <option className="text-black" value="قريات">
                {t("addParking.city6")}
              </option>
            </select>
          </div>
          <div
            className={
              BookNow
                ? `  ${language == "ar" ? "text-end" : "text-start"
                }   d-none text-end `
                : `  ${language == "ar" ? "text-end" : "text-start"
                }  text-start `
            }
          >
            <label
              className={`p-2
                ${language == "ar" ? "text-end" : "text-start"}
                `}
            >
              {t("reservationDate.startingFrom")}
            </label>
            {/* <input
                icon={<FcOvertime />}
                className={`

                customRange Gray focus border-0 pointer text-center w-100  p-2 rounded-2`}
                type="datetime-local"
                name={`time`}
                min={todayDate}
                value={searchData.from}
                onChange={handleInputChange}
             /> */}
            <input
              icon={<FcOvertime />}
              className=" customRange Gray focus  border-0 pointer text-center w-100  p-2 rounded-2"
              type="datetime-local"
              name="from"
              min={todayDate}
              value={searchData.from}
              onChange={handleInputChange}
            />
          </div>
          <div className={` ${language == "ar" ? "text-end" : "text-start"}`}>
            <label className=" p-2">
              {BookNow
                ? t("reservationDate.reservationEnd")
                : t("reservationDate.to")}
            </label>
            <input
              className=" customRange Gray  focus border-0 pointer text-center w-100  p-2  rounded-2"
              type="datetime-local"
              name="to"
              value={searchData.to}
              min={searchData.from || todayDate}
              onChange={handleInputChange}
            />
          </div>
          <div
            onClick={calculateTimeDifference}
            className=" customRange mt-4  border-0 pointer text-center w-100 my- p-2 fw-semibold animate  rounded-2"
          >
            {timeDifference.minutes > 0 ||
              timeDifference.hours > 0 ||
              timeDifference.days > 0
              ? ` ${timeDifference.days} ${t("parkDetials.day")}, ${timeDifference.hours
              } ${t("parkDetials.hour")}, ${timeDifference.minutes} ${t(
                "parkDetials.minute"
              )}`
              : t("reservationDate.parkingDuration")}
          </div>
          <div className={` ${language == "ar" ? "text-end" : "text-start"}`}>
            <button
              type="submit"
              className={`text-center bgColor text-white btn  my-3 ${classes.formBtn}`}
              disabled={user.isEmailConfirmed == false ? true : ''}
            >
              {t("reservationDate.showParking")}
            </button>
            {user.isEmailConfirmed == false && (
              <div
                className={`text-danger ${language == "ar" ? "text-end" : "text-start"
                  }`}
              >
                <div>{t("reservationDate.confirmEmail")}</div>
                <div
                  className={`${classes.resendcode} pointer fs-6 fw-bold mt-md-1`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={handleChange}
                >
                  {t("reservationDate.click")}
                </div>
              </div>
            )}
            <ConfimEmailPop userEmail={user.email} />
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}
