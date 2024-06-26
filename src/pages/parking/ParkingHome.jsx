import { Link } from "react-router-dom";
import ParkingCard from "../../components/dashboader/ParkingCard";
import ParkingFilter from "../../components/dashboader/ParkingFilter";
import { useState } from "react";
import useLogInUserData from "../../../hook/useLogInUserData";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function ParkingHome() {
  const { t } = useTranslation();
  const [userParkings, setUserParkings] = useState([]);
  const user = useLogInUserData();

  return (
    <>
 
    <Helmet>
    <title>Parking Point | {t('home')}</title>
  </Helmet>
    <div className={`d-flex flex-column m-md-5 m-2`}>
      <div className={`d-md-flex w-md-75 mb-5 pb-md-4 pb-1 border-bottom`}>
        <div className="mb-md-0 mb-3 col-6 col-md-5">
          <Link
            to={user.isActivated == false ? `/` : `/Profile/parking`}
            className={
              (!user.isActivated || !user.isEmailConfirmed)
                ? `text-decoration-none btn btn-outline-secondary text-secondary opacity-25`
                : `text-decoration-none btn btn-outline-warning text-dark`
            }
            {...((!user.isActivated || !user.isEmailConfirmed ) &&{
              "data-bs-toggle": "tooltip",
              "data-bs-placement": "top",
              title: t('parkingHome.support'),
            })}
          >
            {t('parkingHome.addNew')}
          </Link>
        </div>
        <div className={`d-flex w-75`}>
          <ParkingFilter value={""} text={t('parkingHome.all')} setUserParkings={setUserParkings} />
          <ParkingFilter value={"?status=approved"} text={t('parkingHome.approved')} setUserParkings={setUserParkings} />
          <ParkingFilter value={"?status=pending"} text={t('parkingHome.pending')} setUserParkings={setUserParkings} />
          <ParkingFilter value={"?status=rejected"} text={t('parkingHome.rejected')} setUserParkings={setUserParkings} />
        </div>
      </div>
      <div className={`align-self-center w-75`}>
        <ParkingCard userParkings={userParkings} setUserParkings={setUserParkings} />
      </div>
    </div> </>
  );
 
}
