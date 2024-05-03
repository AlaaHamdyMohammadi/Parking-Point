import Photoprofile from "./../../components/profile/photoprofile";
import Setting from "../../components/profile/Setting";
import ChangePassword from "../../components/profile/ChangePassword";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  function setting() {
    setShow(true);
  }
  function changePassword() {
    setShow(false);
  }
  const language = useSelector((state) => state.language.language);

  return (
    <>
      <Photoprofile />
      <div
        className="mt-5"
        style={{
          ...(language === "ar"
            ? { paddingRight: "40px" }
            : { paddingLeft: "40px" }),
        }}
      >
        <button
          className=" btn btn-outline-warning text-dark m-2"
          onClick={setting}
        >
          {t("editProfile.editData")}
        </button>
        <button
          className="btn btn-outline-warning text-dark"
          onClick={changePassword}
        >
          {t("editProfile.changePassword")}
        </button>
      </div>
      {show ? <Setting /> : <ChangePassword />}
    </>
  );
}
