/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StarRating from "./StarRating";

function MyVerticallyCenteredModal() {
  return (
    <div
      className="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabIndex="-1"
    >
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-header p-1 m-0 ">
            <h5 className="modal-title pe-2" id="exampleModalToggleLabel">
              التقييم
            </h5>
            <button
              type="button"
              className="btn-close m-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body justify-content-center d-flex gap-4">
            <StarRating />
          </div>
          <div className="modal-footer p-0">
            <button
              className="btn bgColor text-white "
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
            >
              ارسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarRatingModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className=" bgColor text-white w-100   p-0  btn "
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        احجز{" "}
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default StarRatingModal;

/*

<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <button
          type="button"
          className="closeButton m-0"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#331c41" }}
        >
          التقييم
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center gap-5">
        <StarRating />
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: "#331c41", border: "none" }}
          onClick={props.onHide}
        >
          إرسال
        </Button>
      </Modal.Footer>
    </Modal>

    <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

*/
