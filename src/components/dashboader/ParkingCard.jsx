import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
export default function ParkingCard() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="mb-3 col-12 col-md-9 my-md-5 my-2 row">
                <div className="p-1 col-11">
                    <div className="d-flex pb-3 border-bottom justify-content-between">
                        <div className="d-flex col-6">
                            <div>
                                <img src={`./../../../public/images/park.jpg`} alt="" className="w-75 rounded" />
                            </div>
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <div >
                                    <h5 className="">parking name</h5>
                                    <h6 className="">السعة : </h6>
                                    <h6 className="">العنوان :</h6>
                                    <p className="card-text">تمت الإضافة:</p>
                                    <p className="card-text"><small className="text-body-secondary">اخر تعديل : </small></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-between align-items-center">
                            <div className={`badge px-4 rounded-pill bg-success bg-opacity-75`}>نشط</div>
                            <div className="dropdown">
                                <Link className="btn btn-outline-warning dropdown-toggle text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    أجراءات
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">تحرير</Link></li>
                                    <li className="dropdown-item">إلغاء تنشيط</li>
                                    <li onClick={handleShow} className="dropdown-item" role="button">حذف</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>هل انت متاكد من حذف هذا الموقف ؟</Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleClose}>
                            إلغاء
                        </Button>
                        <Button variant="warning">
                            حذف
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}