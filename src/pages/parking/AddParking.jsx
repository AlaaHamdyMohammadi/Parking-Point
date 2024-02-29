import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CitySelect from "../../components/formFun/CitySelect";
import classes from "./../../styles/formStyles.module.css";
// import RegionInput from "../../components/formFun/RegionInput";
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
      longitude: "31.22",
      latitude: "30.22",
    },
  });
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
      setImgArr(res.data.doc.photos);
    };
    if (ParkingId) {
      editParking();
    }
  }, []);
  const [errors, setErrors] = useState({
    photosErrors: "",
    cityErrors: "",
    titleErrors: "",
    addressErrors: "",
    capacityErrors: "",
    locationErrors: "",
  });
  const formData = new FormData();
  function uploadFile(files, formData) {
    [...files].forEach((file) => formData.append("photos", file));
  }
  function saveImageArr(eve) {
    setImgArr((i) => [...i, ...Array.from(eve.target.files)]);
    setParking({ ...parking, photos: [...imgArr, ...Array.from(eve.target.files)] });
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
      setErrors({ ...errors, photosErrors: value.length === 0 ? "يجب إضافة صورة بحد ادني" : "" });
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
      setErrors({ ...errors, addressErrors: value.length === 0 ? "يجب ادخال المحافظة" : "" });
    }
    if (name === "location") {
      setErrors({ ...errors, locationErrors: value.length === 0 ? "يجب ادخال نص" : "" });
    }
    if (name === "capacity") {
      setErrors({ ...errors, capacityErrors: value.length === 0 ? "يجب ادخال السعة" : "" });
    }
    setParking({ ...parking, [name]: value });
  }

  function handleSubmit(event) {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(parking).some((parking) => parking === "");
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      if (ParkingId) {
        console.log(ParkingId);
        axiosInstanceParking
          .patch(`/parkings/${ParkingId}`, parking, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("update request successful", res.data);
            navigate("/");
          })
          .catch((err) => {
            console.error("Error during parking request:", err);
          });
      } else if (!ParkingId) {
        formData.append("city", parking.city);
        formData.append("title", parking.title);
        formData.append("address", parking.address);
        formData.append("capacity", parking.capacity);
        formData.append("longitude", parking.location.longitude);
        formData.append("latitude", parking.location.latitude);
        uploadFile(imgArr, formData);
        axiosInstanceParking
          .post(`/parkings`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("Post request successful", res.data);
            navigate("/Profile/parkingHome");
          })
          .catch((err) => {
            console.error("Error during parking request:", err);
          });
      }
    }
    event.preventDefault();
  }
  console.log(parking);
  return (
    <>
      <h3 className={`mt-4 text-center`}>لإضافة موقف يرجي ادخال البيانات الصحيحة</h3>
      <div className={`card w-75 align-self-center p-2`}>
        <div className={`p-5`}>
          <h5 className={`text-secondary text-center`}>يمكن إضافة ثلاث صور فقط</h5>
          <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
            <div className={` p-2 d-flex justify-content-center`}>
              {imgArr.map((image, index) => (
                <div
                  className={`col-3 mx-2 border d-flex d-flex align-items-center justify-content-center position-relative`}
                  key={index}
                >
                  <div onClick={() => removeImage(index)} className={`position-absolute top-0 end-0`} role="button">
                    <MdClose className="fs-5 bgColor text-white" />
                  </div>
                  <img className="w-100" src={showImages(image)} alt="Selected" />
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
              <p className={`${classes.error} text-danger`}>{errors.imageErrors}</p>
            </div>

            <div className="row">
              <div className="form-group mb-3 col-12 col-md-6 ">
                {/* <RegionInput regionInfo={parking} classes={classes} setRegionInfo={setParking} errors={errors} setErrors={setErrors}/> */}
                <label htmlFor="address" className="mb-1 fs-5">
                  المنطقة
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
                <p className={`${classes.error} text-danger`}>{errors.addressErrors}</p>
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
                <p className={`${classes.error} text-danger`}>{errors.titleErrors}</p>
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
                <p className={`${classes.error} text-danger`}>{errors.capacityErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="address" className="mb-1 fs-5">
                  المحافظه
                </label>
                <select
                  id="address"
                  name="address"
                  value={parking.address}
                  onChange={validation}
                  onBlur={validation}
                  className={`form-control border border-secondary shadow-none`}
                >
                  <option value={` `} selected disabled>
                    حدد المحافظة
                  </option>
                  <option value="مسقط">مسقط</option>
                </select>
                <p className="text-danger text-center">{errors.addressErrors}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {ParkingId ? (
                <input
                  type="submit"
                  value={`تعديل الموقف`}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? "btn bgColor text-white col-4 disabled"
                      : "btn bgColor text-white col-4 "
                  }
                  disabled={Object.values(parking).some((parking) => parking == "")}
                />
              ) : (
                <input
                  type="submit"
                  value={`إضافة موقف`}
                  className={
                    Object.values(errors).some((error) => error !== "")
                      ? "btn bgColor text-white col-4 disabled"
                      : "btn bgColor text-white col-4 "
                  }
                  disabled={Object.values(parking).some((parking) => parking == "")}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
