import { useEffect, useRef, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdClose } from "react-icons/md";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useSelector } from "react-redux";
export default function AddParking() {
  const profileImgRef = useRef(null);
  const token= useSelector((state) => state.token.token)
  console.log(token);
  function clickImgInput() {
    profileImgRef.current.click();
  }
  const [imgArr, setImgArr] = useState([]);
  const [parking, setParking] = useState({
    // photos: [],
    photos: "",
    owner: "",
    city: "",
    state: "",
    address: "",
    capacity: 1,
    // location: '',
  });
useEffect(() => {
  axiosInstanceParking.get(`/parking`).then((res) => {
console.log("Post request successful", res.data);
})
.catch((err) => {
  console.error("Error during POST request:", err);
});
}, []);
  const [errors, setErrors] = useState({
    photosErrors: "",
    cityErrors: "",
    stateErrors: "",
    addressErrors: "",
    capacityErrors: "",
    // locationErrors: '',
  });

  function saveImageArr(eve) {
    setImgArr((i) => [...i, ...Array.from(eve.target.files)]);
    setParking({ ...parking, photos: [...imgArr, ...Array.from(eve.target.files)] });
  }
  function showImages(image) {
    try {
      return URL.createObjectURL(image);
    } catch (err) {
      console.log(err);
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
      setParking({ ...parking, photos: event.target.value });

    }
    if (event.target.name === "city") {
      setErrors({ ...errors, cityErrors: event.target.value.length === 0 ? "يجب ادخال الولاية" : "" });
      setParking({ ...parking, city: event.target.value });
    }
    if (event.target.name === "state") {
      setErrors({
        ...errors,
        stateErrors:
          event.target.value.length === 0
            ? "يجب ادخال المنطقه"
            : /^[A-Za-z0-9\u0600-\u06FF]{3,}$/.test(event.target.value)
            ? ""
            : "يجب ادخال ثلاثة احرف بحد ادني",
      });
      setParking({ ...parking, state: event.target.value });
    }
    if (event.target.name === "address") {
      setErrors({ ...errors, addressErrors: event.target.value.length === 0 ? "يجب ادخال المحافظة" : "" });
      setParking({ ...parking, address: event.target.value });
    }
    // if (event.target.name === "location") {
    //   setErrors({ ...errors, locationErrors: event.target.value.length === 0 ? "يجب ادخال نص" : "" })
    //   setParking({ ...parking, location: event.target.value });
    // }
    if (event.target.name === "capacity") {
      setErrors({ ...errors, capacityErrors: event.target.value.length === 0 ? "يجب ادخال السعة" : "" });
      setParking({ ...parking, capacity: event.target.value });
    }
  }

  function handleSubmit(event) {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(parking).some((parking) => parking === "");
    const formData = new FormData();
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      formData.append("photos", parking.photos);
      formData.append("city", parking.city);
      formData.append("state", parking.state);
      formData.append("address", parking.address);
      formData.append("capacity", parking.capacity);
      formData.append("location", parking.location);
      event.preventDefault();

      axiosInstanceParking.post(`/parkings`, parking,{
        headers: {
          'Authorization': `Bearer ${token}`
        }}).then((res) => {
        console.log("Post request successful", res.data);
      })
      .catch((err) => {
        console.error("Error during POST request:", err);
      });
    }
    // console.log(formData);
    console.log(parking);
  }
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
                <div
                  className={`col-4 mx-2 border d-flex p-5 d-flex align-items-center justify-content-center`}
                  role="button"
                  onClick={clickImgInput}
                >
                  <MdOutlineAddBusiness className={`fs-1 `} />
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
                  <option value="masqt">مسقط</option>
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
                  <option value="masqt">مسقط</option>
                  <option value="mtrh">مطرح</option>
                  <option value="seeb">السيب</option>
                  <option value="boshr">بوشر</option>
                  <option value="amrat">العامرات</option>
                  <option value="qryat">قريات</option>
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
              <input
                type="submit"
                value={`إضافة موقف`}
                className={
                  Object.values(errors).some((error) => error !== "")
                    ? "btn bgColor text-white col-4 disabled"
                    : "btn bgColor text-white col-4 "}
                disabled={Object.values(parking).some((parking) => parking == "")}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
