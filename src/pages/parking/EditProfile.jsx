import Photoprofile from "./../../components/profile/photoprofile";
import Setting from "../../components/profile/Setting";
import ChangePassword from "../../components/profile/ChangePassword";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditProfile() {
  const { t } = useTranslation();
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
      <div className="mt-5" style={{paddingRight: "40px"}}>
        <button className=" btn btn-outline-warning text-dark m-2" onClick={setting}>{t('editProfile.editData')}</button>
        <button className="btn btn-outline-warning text-dark" onClick={changePassword}>{t('editProfile.changePassword')}</button>
      </div>
      {show ?
        <Setting /> :
        <ChangePassword />
      }
    </>
  );
}
