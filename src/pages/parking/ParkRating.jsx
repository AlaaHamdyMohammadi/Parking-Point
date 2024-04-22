/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { toast, ToastContainer } from "react-toastify";

const ParkRating = ({ parkId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const token = useSelector((state) => state.loggedIn.token);

  const handleRating = async (rating) => {
    try {
      const response = await axiosInstanceParking.post(
        "/reviews",
        {
          park: parkId,
          rate: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("تم إضافة تقييمك بنجاح!شكرا لك");
      //console.log("response:", response);
    } catch (error) {
      toast.error("لقد قمت بتقييم الموقف سابقأ");
      console.error("Error occurred :", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onChange={() => {
                setRating(ratingValue);
                handleRating(ratingValue);
              }}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#f1a525" : "#331c41"}
              size={15}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(rating)}
            />
          </label>
        );
      })}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ParkRating;
