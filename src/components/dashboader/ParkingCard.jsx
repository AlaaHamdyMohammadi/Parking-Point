import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { parkingplaces } from "../home/parkingplaces";
import StarRating from "../driver/StarRating";
export default function ParkingCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {parkingplaces.map((item, index) => (
        <div key={item.id} className="mb-3  w-100 d-flex row">
          <div className=" d-flex   w-100   pb-2 border-bottom justify-content-between">
            <div className="col-3">
              <div id={`carouselExampleInterval${index}`} className=" w-100 carousel rounded " data-bs-ride="carousel">
                <div className="carousel-inner  ">
                  <div className="carousel-item  active" data-bs-interval="10000">
                    <img
                      src={item.imgpath[0]}
                      style={{ width: "3vh", height: "18vh" }}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item " data-bs-interval="2000">
                    <img
                      src={item.imgpath[1]}
                      style={{ width: "3vh", height: "18vh" }}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={item.imgpath[2]}
                      style={{ width: "3vh", height: "18vh" }}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carouselExampleInterval${index}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carouselExampleInterval${index}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <div className="col-lg-8 pe-3 col-sm-12 d-lg-flex gap-4">
              <div className="col-lg-6 col-sm-12  align-items-center">
                <h5>parking name</h5>

                <p className="mb-0 customfs  ">
                  <span className=" fw-semibold">العنوان: </span>
                  {item.avaliable} مسقط/شارع مسقط
                </p>
                <p className="mb-0 customfs  ">
                  <span className=" fw-semibold"> الأماكن المتاحه: </span>
                  {item.avaliable} 55 مكان
                </p>
                <p className="mb-0 customfs  ">
                  <span className=" fw-semibold"> السعة: </span>
                  {item.avaliable} 55 مكان
                </p>

                {/* <p className="card-text">تمت الإضافة:</p> */}
                <p className="card-text">{/* <small className="text-body-secondary">اخر تعديل : </small> */}</p>
              </div>
              <div className=" d-flex gap-2  py-2 w-100 justify-content-between ">
                <div className=" d-lg-flex gap-3 flex-lg-column  text-center ">
                  <div className={`badge px-4 rounded-pill bgColor bg-opacity-75 text-center`}>نشط</div>
                  <div className="d-flex flex-row  justify-content-center ">
                    <StarRating />
                  </div>
                </div>
                <div className="dropdown">
                  <Link
                    className="btn btn-outline-warning dropdown-toggle text-black"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    أجراءات
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={`/dashboard/:ownerId/edit_parking/:ParkingId`}>
                        تعديل
                      </Link>
                    </li>
                    <li className="dropdown-item">إلغاء تنشيط</li>
                    <li onClick={handleShow} className="dropdown-item" role="button">
                      حذف
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>هل انت متاكد من حذف هذا الموقف ؟</Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleClose}>
                إلغاء
              </Button>
              <Button variant="warning">حذف</Button>
            </Modal.Footer>
          </Modal>
        </div>
      ))}
    </>
  );
}
