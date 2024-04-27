// import { useState, useEffect } from "react";

// const CountdownTimer = () => {
//   const [seconds, setSeconds] = useState(600); // 10 minutes in seconds

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds === 0) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prevSeconds - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup the interval on unmount
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   // Convert seconds to minutes and seconds
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;

//   // Format the time nicely
//   const formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

//   return <span>{formattedTime}</span>;
// };

// export default CountdownTimer;
// CountdownTimer.js
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ resetTimer }) => {
  const [seconds, setSeconds] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Reset the timer
  useEffect(() => {
    setSeconds(600);
  }, [resetTimer]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format the time nicely
  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  return <span>{formattedTime}</span>;
};

export default CountdownTimer;
