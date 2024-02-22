/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StarRating from "./StarRating";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{ color: "#331c41" }}>التقييم</Modal.Title>
      </Modal.Header>
      <Modal.Body
        
        className="d-flex justify-content-center gap-5"
      >
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
  );
}

function StarRatingModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default StarRatingModal;
