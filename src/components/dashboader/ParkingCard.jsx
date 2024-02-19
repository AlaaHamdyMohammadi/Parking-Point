import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { parkingplaces } from "../home/parkingplaces";
export default function ParkingCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {parkingplaces.map((item, index) => (
        <div key={item.id} className="mb-3 w-100 d-flex row">
          <div className=" d-lg-flex d-md-flex  w-100  gap-4 pb-3 border-bottom justify-content-between">
            <div id={`carouselExampleInterval${index}`} className="w-100 carousel rounded " data-bs-ride="carousel">
              <div className="carousel-inner ">
                <div className="carousel-item  active" data-bs-interval="10000">
                  <img src={item.imgpath[0]} className="d-block  w-100" alt="..." />
                </div>
                <div className="carousel-item " data-bs-interval="2000">
                  <img src={item.imgpath[1]} className="d-block  w-100" alt="..." />
                </div>
                <div className="carousel-item ">
                  <img src={item.imgpath[2]} className="d-block w-100" alt="..." />
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

            <div className="d-lg-flex  d-md-flex   d-sm-flex gap-4">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <div>
                  <h5 className="">parking name</h5>
                  <h6 className="">السعة : </h6>
                  <h6 className="">العنوان :</h6>
                  <p className="card-text">تمت الإضافة:</p>
                  <p className="card-text">
                    <small className="text-body-secondary">اخر تعديل : </small>
                  </p>
                </div>
              </div>
              <div className=" d-lg-flex d-md-flex   w-100 justify-content-evenly align-items-center">
                <div className={`badge px-4 rounded-pill bgColor bg-opacity-75`}>نشط</div>
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
              </div>{" "}
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
