import { Link } from "react-router-dom";

export default function ParkingCard() {
  //   return (
  //     <>
  //       <div className="card  d-flex flex-row m-2 col-3">
  //         <div>
  //           <img src="./images/backgroundjpg.jpg" className="card-img-top" alt="..." />
  //         </div>
  //         <div className="card-body w-100 d-flex flex-row">
  //           <div>
  //             <h5 className="card-title">اسم الموقف </h5>
  //             <p className="card-text">
  //               Some quick example text to build on the card title and make up the bulk of thes content.
  //             </p>
  //           </div>
  //           <Link to={``} href="#" className="btn btn-primary">
  //             حجز الموقف
  //           </Link>
  //         </div>
  //       </div>
  //     </>
  //   );
  return (
    <>
      <div className="card col-md-3 col-12 mx-md-5 my-2 p-0">
        <img src="./images/park.jpg" className="card-img h-50" alt="parking image" />
        <div className="card-body">
          <h5 className="card-title">موقف رقم 1</h5>
          <p className="card-text">موقف مدينة مسقط</p>
          <Link to={``} className={`btn text-light navColor shadow`}>
            أحجز الان
          </Link>
        </div>
      </div>
    </>
  );
}
