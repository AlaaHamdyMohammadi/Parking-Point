/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Terms() {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);

  return (
    <>
      <Helmet>
        <title>Parking Point | الشروط و الأحكام</title>
      </Helmet>
      <div className="w-100">
        <figure className="figure">
          <img src="Terms-and-Conditions.jpg" alt="" className=" w-100" />
          <figcaption
            className={`figure-caption fw-bolder p-5 ${
              language == "ar" ? "text-end" : "text-start"
            }`}
          >
            <h1>{t("terms")}</h1>
          </figcaption>
        </figure>
      </div>
      <div className=" px-5">
        <div className="py-2">
          <h4>{t("terms1")}</h4>

          <p align="justify">{t("terms2")}</p>
        </div>
        <div className="py-2">
          <h4>{t("terms3")}</h4>

          <ul className="p-3 m-0">
            <li align="justify">{t("terms4")}</li>
            <li>{t("terms5")}</li>
            <li align="justify">{t("terms6")}</li>
            <li align="justify">{t("terms7")}</li>
          </ul>
        </div>
        <div className="py-2">
          <h4>{t("terms8")}</h4>
          <ul className="p-3 m-0">
            <li align="justify">{t("terms9")}</li>
            <li>{t("terms10")}</li>
            <li align="justify">{t("terms11")}</li>
            <li align="justify">{t("terms12")}</li>
          </ul>
        </div>
        <div className="py-2">
          <h4>{t("terms13")}</h4>
          <ul className="p-3 m-0">
            <li align="justify">{t("terms14")}</li>
            <li align="justify">{t("terms15")}</li>
            <li align="justify">{t("terms16")}</li>
            <li align="justify">{t("terms17")}</li>
            <li align="justify">{t("terms18")}</li>
            <li align="justify">{t("terms19")}</li>
            <li align="justify">{t("terms20")}</li>
            <li align="justify">{t("terms21")}</li>
            <li align="justify">{t("terms22")}</li>
            <li align="justify">{t("terms23")}</li>
            <li align="justify">{t("terms24")}</li>
            <li align="justify">{t("terms25")}</li>
            <li align="justify">{t("terms26")}</li>
            <li align="justify">{t("terms27")}</li>
            <li align="justify">{t("terms28")}</li>
            <li align="justify">{t("terms29")}</li>
            <li align="justify">{t("terms30")}</li>
            <li align="justify">{t("terms31")}</li>

            <li align="justify">
              <h5 className="fw-semibold my-2">{t("terms32")}</h5>
            </li>

            <ul>
              <li align="justify">{t("terms33")}</li>
              <li align="justify">{t("terms34")}</li>
              <li align="justify">{t("terms35")}</li>
              <li align="justify">{t("terms36")}</li>
              <li align="justify">{t("terms37")}</li>
              <li align="justify">{t("terms38")}</li>
            </ul>
          </ul>
        </div>

        <div className="py-2">
          <h4>{t("terms39")}</h4>
          <p align="justify">{t("terms40")}</p>
        </div>
        <div className="py-2">
          <h4>{t("terms41")}</h4>
          <p align="justify">{t("terms42")}</p>
        </div>
        <div className="py-2">
          <ul className="p-3 m-0">
            <li align="justify">{t("terms43")}</li>
            <li>{t("terms44")}</li>
            <li align="justify">{t("terms45")}</li>
            <li align="justify">{t("terms46")}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
