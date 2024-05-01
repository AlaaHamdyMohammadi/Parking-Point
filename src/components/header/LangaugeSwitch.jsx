/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/slices/language";

const LangaugeSwitch = () => {
  const {t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState("ar");
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  
  const handleChangeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
    if (newLanguage === "en") {
      // document.documentElement.classList.add("ltr");
      dispatch(changeLanguage(newLanguage))
    } else {
      // document.documentElement.classList.remove("ltr");
      dispatch(changeLanguage(newLanguage))
    }
  };
  
  return (
    <>
      {selectedLanguage === "ar" ? (
        <div className="nav-item fw-bold">
          <div
            className="nav-link active mx-md-5 text-white"
            aria-current="page"
            onClick={() => {
              handleChangeLanguage("en");
            }}
            style={{ cursor: "pointer" }}
          >
            <p>English</p>
            {/* <img
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
              }}
              src="EnglandFlag.png"
              alt="EnglandFlag"
            /> */}
          </div>
        </div>
      ) : (
        <div className="nav-item fw-bold">
          <div
            className="nav-link active mx-md-5 text-white"
            aria-current="page"
            onClick={() => {
              handleChangeLanguage("ar");
            }}
            style={{ cursor: "pointer" }}
          >
            <p>العربية</p>
            {/* <img
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
              }}
              src="OmanFlag.png"
              alt="OmanFlag"
            /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default LangaugeSwitch;
