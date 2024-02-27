/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstanceParking from "../axiosConfig/instanc";
import StarRatingModal from "../components/driver/StarRatingModal";

function RatingTest() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

//   useEffect(() => {
//     axiosInstanceParking.get("/parkings").then((res) => {
//       console.log(res);
//     });
//   }, []);

  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              className="RadioNone"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />

            <FaStar
              className="cursor-pointer pointer "
              color={ratingValue <= (hover || rating) ? "#f1a525" : "#aaa5a5"}
              size={12}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <StarRatingModal/>
    </>
  );
}

export default RatingTest;
