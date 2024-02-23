import { useEffect, useRef, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdClose } from "react-icons/md";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
export default function AddParking() {
  const profileImgRef = useRef(null);
  const token = useSelector((state) => state.token.token)
  const user = useSelector((state) => state.user.user)
  let { ParkingId } = useParams();
  // console.log(user._id);
  const navigate = useNavigate();
  // console.log(ParkingId);
  function clickImgInput() {
    profileImgRef.current.click();
  }
  const [imgArr, setImgArr] = useState([]);
  const [parking, setParking] = useState({
    // state: "",
    city: "",
    address: "",
    user: user._id,
    photos: [],
    capacity: 1,
    location: {
      longitude: "31.22",
      latitude: "30.22"
    },
  });
  useEffect(() => {
    const editParking = async () => {
      const res = await axiosInstanceParking.get(`/parkings/${ParkingId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setParking({
        city: res.data.doc.city,
        address: res.data.doc.address,
        user: res.data.doc.user,
        photos: res.data.doc.photos,
        capacity: res.data.doc.capacity,
      });
      setImgArr(res.data.doc.photos)
    };
    if (ParkingId) {
      editParking();
    }
  }, []);
  const [errors, setErrors] = useState({
    photosErrors: "",
    cityErrors: "",
    // stateErrors: "",
    addressErrors: "",
    capacityErrors: "",
    locationErrors: '',
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
      return `${axiosInstanceParking.defaults.baseURL}/${image}`;
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
    if (event.target.name === "photos") {
      setErrors({ ...errors, photosErrors: event.target.value.length === 0 ? "يجب إضافة صورة بحد ادني" : "" });
    }
    if (event.target.name === "city") {
      setErrors({ ...errors, cityErrors: event.target.value.length === 0 ? "يجب ادخال الولاية" : "" });
      setParking({ ...parking, city: event.target.value });
    }
    // if (event.target.name === "state") {
    //   setErrors({
    //     ...errors,
    //     stateErrors:
    //       event.target.value.length === 0
    //         ? "يجب ادخال المنطقه"
    //         : /^[A-Za-z0-9\u0600-\u06FF]{3,}$/.test(event.target.value)
    //         ? ""
    //         : "يجب ادخال ثلاثة احرف بحد ادني",
    //   });
    //   setParking({ ...parking, state: event.target.value });
    // }
    if (event.target.name === "address") {
      setErrors({ ...errors, addressErrors: event.target.value.length === 0 ? "يجب ادخال المحافظة" : "" });
      setParking({ ...parking, address: event.target.value });
    }
    if (event.target.name === "location") {
      setErrors({ ...errors, locationErrors: event.target.value.length === 0 ? "يجب ادخال نص" : "" })
      setParking({ ...parking, location: event.target.value });
    }
    if (event.target.name === "capacity") {
      setErrors({ ...errors, capacityErrors: event.target.value.length === 0 ? "يجب ادخال السعة" : "" });
      setParking({ ...parking, capacity: event.target.value });
    }
  }

  function handleSubmit(event) {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(parking).some((parking) => parking === "");
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      if (ParkingId) {
        console.log(ParkingId);
        axiosInstanceParking.patch(`/parkings/${ParkingId}`, parking, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then((res) => {
          console.log("update request successful", res.data);
          navigate("/Profile/parkingHome");
        }).catch((err) => {
          console.error("Error during parking request:", err);
        });
      } else if (!ParkingId) {
        formData.append("user", parking.user);
        formData.append("city", parking.city);
        // formData.append("state", parking.state);
        formData.append("address", parking.address);
        formData.append("capacity", parking.capacity);
        formData.append("longitude", parking.location.longitude);
        formData.append("latitude", parking.location.latitude);
        uploadFile(imgArr, formData)
        axiosInstanceParking.post(`/parkings`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then((res) => {
          console.log("Post request successful", res.data);
          navigate("/Profile");
        }).catch((err) => {
          console.error("Error during parking request:", err);
        });
      }
    }
    event.preventDefault();
    // console.log(formData);
  }
  // console.log(errors);
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
                    <MdClose className="fs-3 bgColor text-white" />
                  </div>
                  <img className="w-100" src={showImages(image)} alt="Selected" />
                </div>
              ))}
              {imgArr.length < 3 && (
                <div className={`col-4 mx-2 d-flex p-3 d-flex align-items-center justify-content-center`}
                  role="button" onClick={clickImgInput}>
                  <img src="/images/addPhoto.webp" alt="" />
                  <input type="file" name="photos"
                    multiple id="images" accept="image/*" hidden ref={profileImgRef}
                    onChange={(e) => saveImageArr(e)} />
                </div>
              )}
              <p className="text-danger text-center">{errors.imageErrors}</p>
            </div>
            <div className="row">
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="address" className="mb-1 fs-3">
                  <small className="fw-bold">المحافظه</small>
                </label>
                <select id="address" name="address" value={parking.address} onChange={validation} onBlur={validation}
                  className={`form-control border border-secondary shadow-none`}>
                  <option value={``} selected disabled>
                    حدد المحافظة
                  </option>
                  <option value="مسقط">مسقط</option>
                </select>
                <p className="text-danger text-center">{errors.addressErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6">
                <label htmlFor="city" className="mb-1 fs-3">
                  <small className="fw-bold">الولاية</small>
                </label>
                <select id="city" name="city" value={parking.city} onChange={validation} onBlur={validation}
                  className={`form-control border border-secondary shadow-none`}>
                  <option value={``} selected hidden>
                    حدد الولاية
                  </option>
                  <option value="مسقط">مسقط</option>
                  <option value="مطرح">مطرح</option>
                  <option value="السيب">السيب</option>
                  <option value="بوشر">بوشر</option>
                  <option value="العامرات">العامرات</option>
                  <option value="قريات">قريات</option>
                </select>
                <p className="text-danger text-center">{errors.cityErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="state" className="mb-1 fs-3">
                  <small className="fw-bold">المنطقه</small>
                </label>
                <input
                  onChange={validation}
                  onBlur={validation}
                  type="text"
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="state"
                  placeholder=""
                  name="state"
                  value={parking.state}
                />
                <p className="text-danger text-center">{errors.stateErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="capacity" className="mb-1 fs-3">
                  <small className="fw-bold">السعة</small>
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
                <p className="text-danger text-center">{errors.capacityErrors}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {ParkingId ?
                <input
                  type="submit"
                  value={`تعديل الموقف`}
                  className={Object.values(errors).some((error) => error !== "")
                    ? "btn bgColor text-white col-4 disabled"
                    : "btn bgColor text-white col-4 "}
                  disabled={Object.values(parking).some((parking) => parking == "")}
                />
                :
                <input
                  type="submit"
                  value={`إضافة موقف`}
                  className={Object.values(errors).some((error) => error !== "")
                    ? "btn bgColor text-white col-4 disabled"
                    : "btn bgColor text-white col-4 "}
                  disabled={Object.values(parking).some((parking) => parking == "")}
                />
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
