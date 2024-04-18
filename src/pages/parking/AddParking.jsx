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
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CitySelect from "../../components/formFun/CitySelect";
import classes from "./../../styles/formStyles.module.css";
// import RegionInput from "../../components/formFun/RegionInput";
import { Helmet } from "react-helmet";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const mapStyle = "mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf";

export default function AddParking() {
  const profileImgRef = useRef(null);
  const token = useSelector((state) => state.loggedIn.token);
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
    // alert(token);

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
      //   console.log("latitude", parking.latitude);
      //   console.log("longitude", parking.longitude);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [parking]);

  useEffect(() => {
    const editParking = async () => {
      const res = await axiosInstanceParking.get(`/parkings/${ParkingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      console.log(setParking);
      setImgArr(res.data.doc.photos);
    };
    if (ParkingId) {
      editParking();
    }
  }, [ParkingId, token]);
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
      return `${axiosInstanceParking.defaults.baseURL}/parkings/${image}`;
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

  function validation(event) {
    const { name, value } = event.target;
    if (name === "photos") {
      setErrors({
        ...errors,
        photosErrors: value.length === 0 ? "يجب إضافة صورة بحد ادني" : "",
      });
    }
    if (name === "title") {
      setErrors({
        ...errors,
        titleErrors:
          value.length === 0
            ? "يجب ادخال اسم الموقف"
            : /^[A-Za-z0-9\u0600-\u06FF]{3,}$/.test(value)
            ? ""
            : "يجب ادخال ثلاثة احرف بحد ادني",
      });
    }
    if (name === "address") {
      setErrors({
        ...errors,
        addressErrors: value.length === 0 ? "يجب ادخال المحافظة" : "",
      });
    }
    if (name === "location") {
      setErrors({
        ...errors,
        locationErrors: value.length === 0 ? "يجب ادخال الموقع" : "",
      });
    }
    if (name === "capacity") {
      setErrors({
        ...errors,
        capacityErrors: value.length === 0 ? "يجب ادخال السعة" : "",
      });
    }
    setParking({ ...parking, [name]: value });
  }

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
      if (currentLocation) {
        formData.append("latitude", currentLocation.latitude);
        formData.append("longitude", currentLocation.longitude);
      } else {
        formData.append("latitude", parking.location.latitude);
        formData.append("longitude", parking.location.longitude);
      }
      uploadFile(imgArr, formData);
      if (ParkingId) {
        axiosInstanceParking
          .patch(`/parkings/${ParkingId}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })

          .then((res) => {
            console.log("update request successful", res.data);
            toast.success("تم تحديث الموقف بنجاح");

            navigate("/");
          })
          .catch((err) => {
            console.error("Error during parking request:", err);
          });
      } else if (!ParkingId) {
        alert(token);
        axiosInstanceParking
          .post(`/parkings`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("Post request successful", res.data);
            toast.success("تم إضافة الموقف بنجاح");

            navigate("/");
          })
          .catch((err) => {
            console.error("Error during parking request:", err);
          });
      }
    }
    event.preventDefault();
  }

  return (
    <>
      <Helmet>
        <title>Parking Point | إضافة موقف</title>
      </Helmet>
      <h3 className={`mt-4 text-center`}>
        {!ParkingId
          ? "        لإضافة موقف يرجي ادخال البيانات الصحيحة"
          : "تعديل بيانات الموقف"}
      </h3>
      <div className={`card w-75 align-self-center p-2 mb-5`}>
        <div className={`p-5`}>
          <h5 className={`text-secondary text-center`}>
            يمكن إضافة ثلاث صور فقط
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
                  اسم الموقف
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
                {/* <RegionInput regionInfo={parking} classes={classes} setRegionInfo={setParking} errors={errors} setErrors={setErrors}/> */}
                <label htmlFor="address" className="mb-1 fs-5">
                  العنوان
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
                  السعة
                </label>
                <input
                  type="number"
                  min={1}
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
              {/* <button  className="btn bgColor text-white col-11 mb-2 m-auto">
              </button> */}
              {!ParkingId ? (
                <>
                  <label htmlFor="location" className="mb-1 fs-5">
                    الموقع{" "}
                  </label>
                  <div style={{ width: "100vw", height: "85vh" }}>
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
              ) : null}
            </div>
            <div className="d-flex justify-content-center">
              {ParkingId ? (
                <input
                  type="submit"
                  value={`تعديل الموقف`}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? "btn bgColor text-white col-4 my-3 disabled"
                      : "btn bgColor text-white col-4 my-3"
                  }
                  disabled={Object.values(parking).some(
                    (parking) => parking == ""
                  )}
                />
              ) : (
                <input
                  type="submit"
                  value={`إضافة موقف`}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? "btn bgColor text-white col-4 my-3 disabled"
                      : "btn bgColor text-white col-4 my-3 "
                  }
                  disabled={Object.values(parking).some(
                    (parking) => parking == ""
                  )}
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
