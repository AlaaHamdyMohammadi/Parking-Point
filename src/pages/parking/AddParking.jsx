import { useRef, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdClose } from "react-icons/md";

export default function AddParking() {
  const profileImgRef = useRef(null);
  function clickImgInput() {
    profileImgRef.current.click()
  }
  const [imgArr, setImgArr] = useState([]);
  function saveImageArr(eve) {
    setImgArr((i) => [...i, ...Array.from(eve.target.files)]);
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

  return (
    <>
      <h3>لإضافة موقف يرجي ادخال البيانات الصحيحة</h3>
      <div className={`card w-75 p-2`}>
        <div className={`p-5`}>
          <h5 className={`text-secondary text-center`}>يمكن إضافة ثلاث صور فقط</h5>
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
                <input type="file" name="parkingImage" multiple id="images" accept="image/*" hidden ref={profileImgRef} onChange={(e) => saveImageArr(e)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
