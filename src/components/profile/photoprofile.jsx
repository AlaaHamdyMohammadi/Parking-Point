/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { BsPersonFillCheck } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import useLogInUserData from "../../../hook/useLogInUserData";
import { useTranslation } from "react-i18next";

export default function Photoprofile() {
  const { t } = useTranslation();
  const user = useLogInUserData();
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
      .patch(`/users/me/photo`, formData)
      .then((res) => {
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
              src={image ? showImages(image) : "/images/defaultpersonjpg.jpg"}
              className="rounded-circle position-relative"
              style={{ height: "18vh", width: "18vh", marginRight: "30px" }}
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
              <div className="ms-5">
                <TbCameraPlus
                  className="position-absolute top-50 start-0 fs-2 ms-1  btn-yellow text-light rounded-circle p-1"
                  onClick={clickImgInput}
                />
              </div>
            </div>
          </div>
          <p className="mt-2 Gray">
            <BsPersonFillCheck className="editIcon2" />
            <span className="">
              {`${t("editProfile.since")} ${new Date(
                user.createdAt
              ).toLocaleDateString()}`}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
