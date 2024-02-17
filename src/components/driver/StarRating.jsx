/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />

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
    </>
  );
}

export default StarRating;
