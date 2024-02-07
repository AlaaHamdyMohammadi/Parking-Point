import React from "react";
import InputEdit from "../../components/profile/InputEdit";
import SelectEdit from "../../components/profile/selectEdit";

export default function Editaccount() {
  return (
    <>
      {/* تعديل الملف الشخصي */}
      <div className="d-flex flex-column  mt-5 align-self-center  gap-6 align-self-start w-75">
        <div className="row">
          <div className="col-6  col-md-6 col-sm-12">
            <div className="row">
              <InputEdit label="الأسم الأول" placeholder="...............*" type="text" />
              <InputEdit label="الأسم الثاني" placeholder="...............*" type="text" />

              <InputEdit label="رقم الهاتف" placeholder="01023456789 *" type="number" />
            </div>
          </div>

          <div className="col-6 col-md-6 col-sm-12">
            <div className="row">
              <InputEdit label="الأيميل" placeholder="اللأيميل *" type="email" />
              <SelectEdit label="نوع المركبة" option1="سيارة" />
              <InputEdit label="رقم اللوحة" placeholder="142536 *" type="number" />
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <input type="submit" value="تحديث" className={`submit w-50 text-center rounded-3 fs-4 fw-bolder mt-3`} />
        </div>
      </div>
    </>
  );
}
