import { useState } from "react";
import classes from "./../../styles/regist.module.css";
export default function RegisterForm() {
  const [isDriver, setIsDriver] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const displayIsDriver = (event) => {
    if (event.target.checked == true) {
      setIsDriver(true);
      setIsOwner(false);
    }
  };
  const displayIsOwner = (event) => {
    if (event.target.checked == true) {
      setIsDriver(false);
      setIsOwner(true);
    }
  };
  return (
    <>
      <div className="fs-4 fw-semibold">
        <form action=""></form>
        <div className={`d-flex gap-4`}>
          <div className="d-flex  flex-column">
            <label htmlFor="fullname">الأسم الاول </label>
            <input type="text" className={`${classes.inputcolor}`} id="fullname" />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="lastlname">الأسم الاخير</label>
            <input className={`${classes.inputcolor}`} type="text" id="lastname" />
          </div>
        </div>
        <div>
          <label htmlFor="email">الايميل</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">كلمة السر</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmpassword">تأكيد كلمه السر</label>
          <input type="password" id="confirmpassword" />
        </div>
        <div>
          <label htmlFor="nummob">رقم الهاتف </label>
          <input type="number" id="nummob" />
        </div>
        <div>
          <label> نوع الحساب</label>
        </div>
        <input
          type="radio"
          name="acctype"
          id="driver"
          value="driver"
          onChange={(eve) => {
            displayIsDriver(eve);
          }}
          className={`${classes.inputFilter}`}
        />
        <label className={`m-2 `} htmlFor="driver">
          سائق
        </label>
        <input
          type="radio"
          id="owner"
          name="acctype"
          value="owner"
          onChange={(eve) => {
            displayIsOwner(eve);
          }}
          className={` mt-4 ${classes.inputFilter}`}
        />
        <label className={`m-2 `} htmlFor="owner">
          صاحب موقف
        </label>
        {isDriver && (
          <>
            <div>
              <label htmlFor="numboard">رقم اللوحة</label>
              <input type="number" id="numboard" />
            </div>
            <div>
              <label htmlFor="cars">نوع المركبة</label>
              <select id="cars" name="cars">
                <option value="car">سيارة</option>
              </select>
            </div>
            <input type="submit" value="submit" className={`${classes.submit}`} />
          </>
        )}
        {isOwner && (
          <>
            <div className={`d-flex justify-content-between mt-3`}>
              <div className={`d-flex col-5`}>
                <label className={` ms-2`} htmlFor="Governorate">
                  المحافظه
                </label>
                <select className={`my-2 ms-2`} id="cars" name="cars">
                  <option value="masqt">مسقط</option>
                </select>
              </div>
              <div className={`d-flex col-5`}>
                <label className={`ms-2`} htmlFor="Governorate">
                  الولاية
                </label>
                <select className={`my-2`} id="cars" name="cars">
                  <option value="masqt">مسقط</option>
                  <option value="mtrh">مطرح</option>
                  <option value="seeb">السيب</option>
                  <option value="boshr">بوشر</option>
                  <option value="amrat">العامرات</option>
                  <option value="qryat">قريات</option>
                </select>
              </div>
            </div>
            <div>
              <label className={`mt-3`} htmlFor="area">
                المنطقه{" "}
              </label>
              <input type="text" id="area" />
            </div>
            <input type="submit" value="submit" className={`${classes.submit}`} />
          </>
        )}
      </div>
    </>
  );
}
