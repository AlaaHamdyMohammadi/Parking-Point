/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/slices/language";

const LangaugeSwitch = ({textColor}) => {
  const {t, i18n } = useTranslation();
  // const [selectedLanguage, setSelectedLanguage] = React.useState("ar");
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  
  const handleChangeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    // setSelectedLanguage(newLanguage);
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
      {language === "ar" ? (
        <div className="nav-item fw-bold">
          <div
            className={`d-flex align-items-center gap-2 nav-link active mx-md-5 ${textColor}`}
            aria-current="page"
            onClick={() => {
              handleChangeLanguage("en");
            }}
            style={{ cursor: "pointer" }}
          >
            <p>English</p>
            <img
              src="EnglandFlag.png"
              style={{ width: "20px", height: "20px", marginTop: "-15px" }}
            />
          </div>
        </div>
      ) : (
        <div className="nav-item fw-bold">
          <div
            className={`d-flex align-items-center gap-2 nav-link active mx-md-5 ${textColor}`}
            aria-current="page"
            onClick={() => {
              handleChangeLanguage("ar");
            }}
            style={{ cursor: "pointer" }}
          >
            <p>العربية</p>
            <img
              src="OmanFlag.png"
              style={{
                width: "20px",
                height: "20px",
                marginTop: "-15px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LangaugeSwitch;
