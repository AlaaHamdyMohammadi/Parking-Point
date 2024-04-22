/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { BsPersonFillCheck } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import useLogInUserData from "../../../hook/useLogInUserData";

export default function Photoprofile() {
  const user = useLogInUserData();
  const token = useSelector((state) => state.loggedIn.token);
  const [image, setImage] = useState(null);
  const profileImgRef = useRef(null);
  useEffect(() => {
    setImage(user.photo);
  }, [user.photo]);
  const clickImgInput = () => {
    profileImgRef.current.click();
  };

  const uploadFile = (file, formData) => {
    formData.append("photo", file);
  };
  function showImages(image) {
    try {
      return URL.createObjectURL(image);
    } catch (err) {
      return `${axiosInstanceParking.defaults.baseURL}/img/users/${image}`;
    }
  }

  const uploadUserImg = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    uploadFile(file, formData);
    axiosInstanceParking
      .patch(`/users/me/photo`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("update request successful", res.data);
        setImage(file);
      })
      .catch((err) => {
        console.error("Error during parking request:", err);
      });
  };

  return (
    <>
      <div className="d-flex flex-column position-relative border rounded-3">
        <div className="row" style={{ height: "45vh" }}>
          <img
            src="/images/bg2.gif"
            className="w-100"
            style={{ height: "45vh" }}
          />
        </div>
        <div className="position-absolute top-100 start-50 translate-middle">
          <div>
            <img
              src={image ? showImages(image) : "/defaultpersonjpg.jpg"}
              className="rounded-circle position-relative"
              style={{ height: "20vh", width: "20vh" }}
              alt="..."
            />
            <input
              type="file"
              name="profileImage"
              ref={profileImgRef}
              onChange={uploadUserImg}
              style={{ display: "none" }}
            />
            <div role="button">
              <TbCameraPlus
                className="position-absolute top-50 start-0 fs-3 btn-yellow text-light rounded-circle p-1"
                onClick={clickImgInput}
              />
            </div>
          </div>
          <p className="mt-2 Gray">
            <BsPersonFillCheck className="editIcon2" />
            <span className="">
              {" "}
              {`عضو منذ ${new Date(user.createdAt).toLocaleDateString()}`}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
