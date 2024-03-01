import { FaStar } from "react-icons/fa";

export default function RatingComponent({ rating }) {
  const starArr = (length) => Array.from({ length }, (_, i) => i);

  return (
    <>
      {rating ? (
        <div>
          {[...starArr(rating)].map((_, index) => (
            <FaStar key={index} size={"0.7em"} className="yellowcolor" />
          ))}
          {[...starArr(5 - rating)].map((_, index) => (
            <FaStar key={index + rating} size={"0.7em"} className="Gray" />
          ))}
        </div>
      ) : (
        <div>
          <FaStar size={"0.7em"} className="Gray" />
          <FaStar size={"0.7em"} className="Gray" />
          <FaStar size={"0.7em"} className="Gray" />
          <FaStar size={"0.7em"} className="Gray" />
          <FaStar size={"0.7em"} className="Gray" />
        </div>
      )}
    </>
  );
}
