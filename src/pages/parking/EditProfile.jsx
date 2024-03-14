import Photoprofile from "./../../components/profile/photoprofile";
import Setting from "../../components/profile/Setting";
import ChangePassword from "../../components/profile/ChangePassword";
import { useState } from "react";

export default function EditProfile() {
  const [show, setShow] = useState(true);
  function setting() {
    setShow(true);
  }
  function changePassword() {
    setShow(false);
  }
  return (
    <>
      <Photoprofile />
      <div className="mt-5 pe-5">
        <button className="btn btn-outline-warning text-dark m-2" onClick={setting}>تعديل البيانات</button>
        <button className="btn btn-outline-warning text-dark" onClick={changePassword}>تغيير كلمة السر</button>
      </div>
      {show ?
        <Setting /> :
        <ChangePassword />
      }
    </>
  );
}
