/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  Marker,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MdClose } from "react-icons/md";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./../../styles/formStyles.module.css";
import { Helmet } from "react-helmet";
import CitySelect from "../../components/FormsValidations/formFun/CitySelect";
import { useTranslation } from "react-i18next";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const mapStyle = "mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf";

export default function AddParking() {
  const { t } = useTranslation();
  const profileImgRef = useRef(null);
  let { ParkingId } = useParams();
  const navigate = useNavigate();
  function clickImgInput() {
    profileImgRef.current.click();
  }
  const [imgArr, setImgArr] = useState([]);
  const [parking, setParking] = useState({
    title: "",
    city: "",
    address: "",
    photos: [],
    capacity: 1,
    location: {
      longitude: 0,
      latitude: 0,
    },
    zoom: 10,
  });

  useEffect(() => {
    const editParking = async () => {
      const res = await axiosInstanceParking.get(`/parkings/myparks/${ParkingId}`);
      console.log(res);
      setParking({
        city: res.data.doc.city,
        title: res.data.doc.title,
        address: res.data.doc.address,
        user: res.data.doc.user,
        photos: res.data.doc.photos,
        capacity: res.data.doc.capacity,
        location: {
          longitude: res.data.doc.longitude,
          latitude: res.data.doc.latitude,
        },
      });

      setImgArr(res.data.doc.photos);
    };
    if (ParkingId) {
      editParking();
    }
  }, [ParkingId]);
  const [errors, setErrors] = useState({
    photosErrors: "",
    cityErrors: "",
    titleErrors: "",
    addressErrors: "",
    capacityErrors: "",
    locationErrors: "",
  });
  function uploadFile(files, formData) {
    [...files].forEach((file) => formData.append("photos", file));
  }
  function saveImageArr(eve) {
    setImgArr((i) => [...i, ...Array.from(eve.target.files)]);
    setParking({
      ...parking,
      photos: [...imgArr, ...Array.from(eve.target.files)],
    });
  }
  function showImages(image) {
    try {
      return URL.createObjectURL(image);
    } catch (err) {
      return `${axiosInstanceParking.defaults.baseURL}/img/parkings/${image}`;
    }
  }
  const removeImage = (index) => {
    setImgArr((prevImgArr) => {
      const updatedImgArr = [...prevImgArr];
      updatedImgArr.splice(index, 1);
      setParking({ ...parking, photos: [...updatedImgArr] });
      return updatedImgArr;
    });
  };
  let capacityemailRegx = /^(1|2|3|4|5|6|7|8|9|10)$/;
  function validation(event) {
    const { name, value } = event.target;
    if (name === "photos") {
      setErrors({
        ...errors,
        photosErrors: value.length === 0 ? t("addParking.imgErr") : "",
      });
    }
    if (name === "title") {
      setErrors({
        ...errors,
        titleErrors:
          value.length === 0
            ? t("addParking.titleErr")
            : // : /^[A-Za-z0-9\u0600-\u06FF]{3,}$/.test(value)
              // ? ""
              // : "يجب ادخال ثلاثة احرف بحد ادني",
              "",
      });
    }
    if (name === "address") {
      setErrors({
        ...errors,
        addressErrors: value.length === 0 ? t("addParking.addressErr") : "",
      });
    }
    if (name === "location") {
      setErrors({
        ...errors,
        locationErrors: value.length === 0 ? t("addParking.locationErr") : "",
      });
    }
    if (name === "capacity") {
      // setErrors({
      //   ...errors,
      //   capacityErrors: value.length === 0 ? "يجب ادخال السعة" : "",
      // });
      setErrors({
        ...errors,
        capacityErrors:
          value.length === 0
            ? t("addParking.capacityErr1")
            : capacityemailRegx.test(value)
            ? ""
            : t("addParking.capacityErr2"),
      });
    }
    setParking({ ...parking, [name]: value });
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setParking((prevViewport) => ({
          ...prevViewport,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [parking]);
  function handleSubmit(event) {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(parking).some((parking) => parking === "");
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("city", parking.city);
      formData.append("title", parking.title);
      formData.append("address", parking.address);
      formData.append("capacity", parking.capacity);

      formData.append("latitude", parking.location.latitude);
      formData.append("longitude", parking.location.longitude);

      uploadFile(imgArr, formData);
      if (ParkingId) {
        axiosInstanceParking
          .patch(`/parkings/${ParkingId}`, formData)

          .then((res) => {
            toast.success("تم تحديث الموقف بنجاح ! في انتظار المراجعة...");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {
            console.error("Error during parking request:", err);
            toast.error("حدث خطأ ! يرجى المحاولة مرة أخرى");
          });
      } else if (!ParkingId) {
        axiosInstanceParking
          .post(`/parkings`, formData)
          .then((res) => {
            toast.success("تم إضافة الموقف بنجاح ! في انتظار المراجعة...");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {
            toast.error("حدث خطأ ! يرجى المحاولة مرة أخرى");
            console.error("Error during parking request:", err);
          });
      }
    }
    event.preventDefault();
  }

  return (
    <>
      <Helmet>
        <title>Parking Point | {t("addParking.addParking")}</title>
      </Helmet>
      <h3 className={`mt-4 text-center`}>
        {!ParkingId ? t("addParking.addTitle") : t("addParking.editTitle")}
      </h3>
      <div className={`card w-md-75 w-100 align-self-center p-2 mb-5`}>
        <div className={`p-md-5`}>
          <h5 className={`text-secondary text-center`}>
            {t("addParking.img")}
          </h5>
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className={` p-2 d-flex justify-content-center`}>
              {imgArr.map((image, index) => (
                <div
                  className={`col-3 mx-2 border d-flex d-flex align-items-center justify-content-center position-relative`}
                  key={index}
                >
                  <div
                    onClick={() => removeImage(index)}
                    className={`position-absolute top-0 end-0`}
                    role="button"
                  >
                    <MdClose className="fs-5 bgColor text-white" />
                  </div>
                  <img
                    className="w-100"
                    src={showImages(image)}
                    alt="Selected"
                  />
                </div>
              ))}
              {imgArr.length < 3 && (
                <div
                  className={`col-4 mx-2 d-flex p-3 d-flex align-items-center justify-content-center`}
                  role="button"
                  onClick={clickImgInput}
                >
                  <img src="/images/addPhoto.webp" alt="" />
                  <input
                    type="file"
                    name="photos"
                    multiple
                    id="images"
                    accept="image/*"
                    hidden
                    ref={profileImgRef}
                    onChange={(e) => saveImageArr(e)}
                  />
                </div>
              )}
              <p className={`${classes.error} text-danger`}>
                {errors.imageErrors}
              </p>
            </div>

            <div className="row">
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="title" className="mb-1 fs-5">
                  {t("addParking.parkingName")}
                </label>
                <input
                  onChange={validation}
                  onBlur={validation}
                  type="text"
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="title"
                  placeholder=""
                  name="title"
                  value={parking.title}
                />
                <p className={`${classes.error} text-danger`}>
                  {errors.titleErrors}
                </p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="address" className="mb-1 fs-5">
                  {t("addParking.address")}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={parking.address}
                  onChange={validation}
                  onBlur={validation}
                  className={`form-control border-secondary shadow-none`}
                />
                <p className={`${classes.error} text-danger`}>
                  {errors.addressErrors}
                </p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6">
                <CitySelect
                  cityInfo={parking}
                  classes={classes}
                  setCityInfo={setParking}
                  errors={errors}
                  setErrors={setErrors}
                />
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="capacity" className="mb-1 fs-5">
                  {t("addParking.capacity")}
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={parking.capacity}
                  onChange={validation}
                  onBlur={validation}
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="capacity"
                  placeholder=""
                  name="capacity"
                />
                <p className={`${classes.error} text-danger`}>
                  {errors.capacityErrors}
                </p>
              </div>
              {!ParkingId ? (
                <>
                  <label htmlFor="location" className="mb-1 fs-5">
                    {t("addParking.location")}
                  </label>
                  <div style={{ width: "100vw", height: "45vh" }}>
                    <ReactMapGL
                      {...parking}
                      mapStyle={mapStyle}
                      mapboxAccessToken={TOKEN}
                      onViewportChange={setParking}
                      dragPan={true}
                    >
                      <Marker
                        draggable
                        latitude={parking.location.latitude}
                        longitude={parking.location.longitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                      />

                      <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        showUserLocation={true}
                      />
                      <FullscreenControl />
                    </ReactMapGL>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="d-flex justify-content-center">
              {ParkingId ? (
                <input
                  type="submit"
                  value={t("addParking.editBtn")}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? "btn bgColor text-white col-md-4 col-10 my-3 disabled"
                      : "btn bgColor text-white col-md-4 col-10 my-3"
                  }
                  disabled={Object.values(parking).some(
                    (parking) => parking == ""
                  )}
                />
              ) : (
                <input
                  type="submit"
                  value={t("addParking.addBtn")}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? "btn bgColor text-white col-md-4 col-10 my-3 disabled"
                      : "btn bgColor text-white col-md-4 col-10 my-3 "
                  }
                  // disabled={Object.values(parking).some(
                  //   (parking) => parking == ""
                  // )}
                />
              )}
              <ToastContainer position="top-right" autoClose={2000} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
