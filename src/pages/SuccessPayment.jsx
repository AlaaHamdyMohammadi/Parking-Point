/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstanceParking from "../axiosConfig/instanc";

const SuccessPayment = () => {
  const token = useSelector((state) => state.loggedIn.token);
  const navigate = useNavigate();
  const [parkId, setParkId] = useState("");
  useEffect(() => {
    const handlePayment = async () => {
      try {
        const ReserveResponse = await axiosInstanceParking.post(
          `/reserve/confirm-reservation`,
          {
            sessionId: localStorage.getItem("sessionID"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
        console.error("Error :", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
        }
      }
    };

    handlePayment();
  }, [navigate, token]);

  return (
    <>
      <div className="vh-75 d-flex justify-content-center align-items-center my-5">
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
              <h1>شكرًا لك!</h1>
              <p>
                تم إتمام عملية الدفع بنجاح،يمكنك الآن الذهاب الي الموقف و
                الاستمتاع بخدماتنا.
              </p>
              <p> تفاصيل الحجز...</p>
              <Spinner animation="border" variant="success" size="lg" />;
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;

// import React, { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axiosInstanceParking from "../axiosConfig/instanc";

// const SuccessPayment = () => {
//   const token = useSelector((state) => state.loggedIn.token);
//   const navigate = useNavigate();
//   const [parkId, setParkId] = useState("");
//   useEffect(() => {
//     const handlePayment = async () => {
//       try {
//         const ReserveResponse = await axiosInstanceParking.post(
//           `/reserve/confirm-reservation`,
//           {
//             sessionId: localStorage.getItem("sessionID"),
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         localStorage.removeItem("sessionID");

//         const newParkId = ReserveResponse.data.reserve.park;
//         const From = ReserveResponse.data.reserve.time.from;
//         const To = ReserveResponse.data.reserve.time.to;
//         const price = ReserveResponse.data.reserve.price;

//         setParkId(newParkId);
//         setTimeout(() => {
//           // Construct the hash fragment with hashed values
//           const hashFragment = `#from=${encodeURIComponent(
//             From
//           )}&to=${encodeURIComponent(To)}&price=${encodeURIComponent(
//             price
//           )}&newParkId=${encodeURIComponent(newParkId)}`;
//           // Append hash fragment to the URL
//           window.location.hash = hashFragment;
//           console.log(hashFragment);
//           // Navigate to the ParkDetails component
//           navigate("/ParkDetails");
//         }, 2000);
//       } catch (err) {
//         console.error("Error :", err);
//         if (err.response) {
//           console.error("Response data:", err.response.data);
//         }
//       }
//     };

//     handlePayment();
//   }, [navigate, token]);

//   return (
//     <>
//       <div className="vh-75 d-flex justify-content-center align-items-center my-5">
//         <div className="col-md-4">
//           <div className="border border-3 border-success"></div>
//           <div className="card  bg-white shadow p-5">
//             <div className="mb-4 text-center mx-auto">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="75"
//                 height="75"
//                 color="#198754"
//                 fill="currentColor"
//                 className=" text-success bi bi-check-circle"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                 <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
//               </svg>
//             </div>
//             <div className="text-center ">
//               <h1>شكرًا لك!</h1>
//               <p>
//                 تم إتمام عملية الدفع بنجاح،يمكنك الآن الذهاب الي الموقف و
//                 الاستمتاع بخدماتنا.
//               </p>
//               <p> تفاصيل الحجز...</p>
//               <Spinner animation="border" variant="success" size="lg" />;
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SuccessPayment;
