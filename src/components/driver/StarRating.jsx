/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const token = useSelector((state) => state.loggedIn.token);

  useEffect(() => {
    axiosInstanceParking
      .post("/reviews", {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res);
      });
  }, [token]);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} className="p-2">
            <input
              type="radio"
              className="RadioNone"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />

            <FaStar
              className="cursor-pointer pointer"
              color={ratingValue <= (hover || rating) ? "#f1a525" : "#aaa5a5"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
