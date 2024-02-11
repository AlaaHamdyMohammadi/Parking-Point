import { useState } from "react";
import InputEdit from "../../components/profile/InputEdit";
import SelectEdit from "../../components/profile/selectEdit";
import Photoprofile from "../../components/profile/photoprofile";

export default function Editaccount() {
  const [fristName, setFristNam] = useState("");
  const [lastName, setLastNam] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carType, setCarType] = useState("");
  const userInfo = {
    fristName: fristName,
    lastName: lastName,
    phone: phone,
    email: email,
    carNumber: carNumber,
    carType: carType,
  };

  console.log(userInfo);

  return (
    <>
      {/* تعديل الملف الشخصي */}
      <div className={`  `}>
        <Photoprofile photo={`/images/defaultpersonjpg.jpg`} time={`عضو منذ 5 اسابيع`} />
      </div>
      <div className="d-flex flex-column  mt-2 align-self-center  gap-6 align-self-start w-75">
        <div className="row">
          <div className="col-6  col-md-6 col-sm-12">
            <InputEdit label="الأسم الأول" placeholder="...............*" type="text" setState={setFristNam} />
          </div>
          <div className="col-6  col-md-6 col-sm-12">
            <InputEdit label="الأسم الثاني" placeholder="...............*" type="text" setState={setLastNam} />
          </div>
          <div className="col-6  col-md-6 col-sm-12">
            <InputEdit label="رقم الهاتف" placeholder="01023456789 *" type="number" setState={setPhone} />
          </div>
          <div className="col-6 col-md-6 col-sm-12">
            <InputEdit label="الأيميل" placeholder="اللأيميل *" type="email" setState={setEmail} />
          </div>
          <div className="col-6 col-md-6 col-sm-12">
            <SelectEdit label="نوع المركبة" option1="سيارة" setState={setCarType} />
          </div>
          <div className="col-6 col-md-6 col-sm-12">
            <InputEdit label="رقم اللوحة" placeholder="142536 *" type="number" setState={setCarNumber} />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <input type="submit" value="تحديث" className={`submit w-50 text-center rounded-3 fs-5 fw-bolder mt-3`} />
        </div>
      </div>
    </>
  );
}
