/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axiosInstanceParking from "../../axiosConfig/instanc";

function StarRating() {
  const [averageRating, setAverageRating] = useState([]);
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    axiosInstanceParking.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    axiosInstanceParking.get("/parkings").then((res) => {
      //console.log(res.data.doc);
      setAverageRating(res.data.doc);
    });
  }, [token]);

  return (
    <>
      {averageRating.map((rating) => (
        <RatingComponent key={rating._id} rating={rating.rate} />
      ))}
    </>
  );
}

export default StarRating;

function RatingComponent({ rating }) {
  const starArr = (length) => Array.from({ length }, (_, i) => i);

  return (
    <div>
      {[...starArr(rating)].map((_, index) => (
        <FaStar key={index} style={{ color: "#f1a525" }} />
      ))}
      {[...starArr(5 - rating)].map((_, index) => (
        <FaStar key={index + rating} style={{ color: "#331c41" }} />
      ))}
    </div>
  );
}
