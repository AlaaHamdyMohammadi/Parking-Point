// import Accordion from "./Accordion";
import { useRef, useState } from "react";
import { BsPersonFillCheck } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";

export default function Photoprofile({ photo, time }) {
  const [image, setImage] = useState();
  const profileImgRef = useRef(null);
  function clickImgInput() {
      profileImgRef.current.click()
  }
  function ImgInput(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  }
  return (
    <>
      <div className="d-flex flex-column position-relative border rounded-3  ">
        <div className="row" style={{ height: "40vh" }}>
          {/* <img src="./images/homeimg.jpg" className="w-100  " style={{ height: "40vh" }} /> */}
        </div>
        {/* <div className=""> */}
        <div className="position-absolute  top-100 start-50 translate-middle  ">
          <div >
            <img
              src={image ? URL.createObjectURL(image) : photo}
              className="rounded-circle position-relative"
              style={{ height: "20vh", width: "20vh" }}
              alt="..."
            />

            <input type="file" name='profileImage' className='hidden' ref={profileImgRef} onChange={ImgInput} hidden/>
            <div role="button">
            <TbCameraPlus className={`position-absolute top-50 start-0 fs-1 bgColor text-light rounded-circle p-1`} onClick={clickImgInput}/>
            </div>
          </div>
          <p className="mt-2 Gray">
            <BsPersonFillCheck className="editIcon2 " />
            <span className=""> {time}</span>
          </p>
        </div>
      </div>
    </>
  );
}
