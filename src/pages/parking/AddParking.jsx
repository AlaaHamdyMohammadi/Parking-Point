import { useRef, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdClose } from "react-icons/md";

export default function AddParking() {
  const profileImgRef = useRef(null);
  function clickImgInput() {
    profileImgRef.current.click()
  }
  const [imgArr, setImgArr] = useState([]);
  // const [parkigName, setParkingName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setaddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  
  const [imageErrors, setImageErrors] = useState("");
  // const [parkigNameErrors, setParkingNameErrors] = useState("");
  const [cityErrors, setCityErrors] = useState("55555555");
  const [stateErrors, setStateErrors] = useState("");
  const [addressErrors, setaddressErorrs] = useState("");
  const [capacityErrors, ErrorssetCapacity] = useState("");
  const [locationErrors, ErrorssetLocation] = useState("");
  const [parking, setParking] = useState({
    photos: imgArr,
    city:city,
    state:state,
    address:address,
    capacity:capacity,
    location:location
  });

  const errors = useState({
    photosError: imageErrors,
    cityError: cityErrors,
    stateError: stateErrors,
    addressError: addressErrors,
    capacityError: capacityErrors,
    locationError: locationErrors,
  });

console.log(errors);
  function saveImageArr(eve) {
    setImgArr((i) => [...i, ...Array.from(eve.target.files)]);
    setParking({ ...parking, images: [...imgArr, ...Array.from(eve.target.files)] });
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
      return updatedImgArr;
    });
  };

  console.log(parking);
  function validation(event) {
    if (event.target.name === "photos") {
      setImageErrors(event.target.value.length === 0 ? "يجب إضافة صورة بحد ادني" : "",)
    }
    if (event.target.name === "city") {
      setCityErrors( event.target.value.length === 0 ? "يجب ادخال المدينة" : "",)
      setCity(event.target.value)}
    if (event.target.name === "state") {
      setStateErrors( event.target.value.length === 0 ? "يجب ادخال المطقة" : "",)
      setState(event.target.value)}
    if (event.target.name === "address") {
      setaddressErorrs( event.target.value.length === 0 ? "يجب ادخال العنوان" : "",)
      setaddress(event.target.value)}
    if (event.target.name === "location") {
      ErrorssetLocation(event.target.value.length === 0 ? "يجب ادخال نص" : "",)
      setLocation(event.target.value)}
    if (event.target.name === "capacity") {
      ErrorssetCapacity( event.target.value.length === 0 ? "يجب ادخال السعة" : "",)
      setCapacity(event.target.value)}
  }


  function handleSubmit(event) {
  }
  
  return (
    <>
      <h3>لإضافة موقف يرجي ادخال البيانات الصحيحة</h3>
      <div className={`card w-75 p-2`}>
        <div className={`p-5`}>
          <h5 className={`text-secondary text-center`}>يمكن إضافة ثلاث صور فقط</h5>
          <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
            <div className={` p-2 d-flex justify-content-between`}>
              {imgArr.map((image, index) => (
                <div className={`col-4 mx-2 border d-flex d-flex align-items-center justify-content-center position-relative`} key={index}>
                  <div onClick={() => removeImage(index)} className={`position-absolute top-0 end-0`} role="button">
                    <MdClose className="fs-3 bgColor text-white" />
                  </div>
                  <img className="w-100" src={showImages(image)} alt="Selected" />
                </div>

              ))}
              {imgArr.length < 3 && (
                <div className={`col-4 mx-2 border d-flex p-5 d-flex align-items-center justify-content-center`} role="button" onClick={clickImgInput}>
                  <MdOutlineAddBusiness className={`fs-1 `} />
                  <input type="file" name="photos" multiple id="images" accept="image/*" hidden ref={profileImgRef} onChange={(e) => saveImageArr(e)} />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center" >
              <input type="submit" value={`إضافة موقف`} className={`btn bgColor text-white col-4`} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}




