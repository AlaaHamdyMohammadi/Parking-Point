import { useTranslation } from "react-i18next";
import { FaSearchLocation } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function SearchInput() {
  const language = useSelector((state) => state.language.language);
  const { t } = useTranslation();
  return (
    <div className={`position-relative md-w-75 p-2  w-100`}>
      <FaSearchLocation className={`fw-bolder fs-3 p-1 mx-2 ${language=='ar'?'start-0':'end-0'} mt-2 pt-2 position-absolute iconColor`} />
      <input
        type="text"
        className={` my-1  p-2 border border-secondary  shadow-none rounded-2  w-100`}
        placeholder={t('homeSearch')}
      />
    </div>
  );
}
