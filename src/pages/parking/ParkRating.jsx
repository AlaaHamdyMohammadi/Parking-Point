/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axiosInstanceParking from "../../axiosConfig/instanc";

const ParkRating = () => {
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);
const token = useSelector((state) => state.loggedIn.token);

const handleRating = async ({ parkId }) => {
  try {
    const response = await axiosInstanceParking.post(
      "/reviews",
      {
        park: "65d76221811d86798b6d9d60",
        review: "good",
        rate: "3",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('response:', response);
  } catch (error) {
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
            onClick={() => setRating(ratingValue)}
            style={{ display: "none" }}
          />
          <FaStar
            onClick={handleRating}
            className="star"
            color={ratingValue <= (hover || rating) ? "#f1a525" : "#331c41"}
            size={20}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(rating)}
          />
        </label>
      );
    })}
  </div>
);
}

export default ParkRating;
