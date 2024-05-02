import Info from "../../components/profile/Info";
import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import useLogInUserData from "../../../hook/useLogInUserData";
import { LiaCarSideSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axiosInstanceParking from "../../axiosConfig/instanc";
import { useEffect, useState } from "react";

export default function ViewProfile() {
  const { t } = useTranslation();
  const user = useLogInUserData();
  console.log(user);
  // console.log(user);
  // const [user, setuser]=useState({})
  useEffect(() => {
    const getLogInUser =  async () => {
     try {
       const response = await axiosInstanceParking.get('/users/me'
     );
    // console.log(response.data.doc);
    // setuser(response.data.doc);
       return response.data.doc;
     } catch (error) {
       console.log(error);
     }
   }; 
  //  getLogInUser()
 }, []);
  return (
    <div className="row w-100 ">
      <p className="fs-3 fw-bold m-md-3 py-2 ">{t('ownerProfile.userInfo')}</p>
      <div className="my-3 justify-content-center d-lg-flex d-block gap-4 flex-wrap">
        <div className="w-100 d-flex row">
          <div className="col-12 col-md-4">
            <Info
              lable={t('ownerProfile.name')}
              info={`${user.firstName} ${user.lastName}`}
              icon={<FaUserPen className="yellowcolor fs-4" />}
            />
          </div>
          <div className="col-12 col-md-4">
            <Info
              lable={t('ownerProfile.email')}
              info={user.email}
              icon={<MdEmail className="yellowcolor fs-4" />}
            />
          </div>
          <div className="col-12 col-md-4">
            <Info
              lable={t('ownerProfile.phone')}
              info={user.phoneNumber}
              icon={<FaPhone className="yellowcolor fs-4" />}
            />
          </div>

          {user.role == "renter" ? (
            <>
              <div className="col-12 col-md-4">
                <Info
                  lable={t('ownerProfile.region')}
                  info={user.region}
                  icon={<FaCity className="yellowcolor" />}
                />
              </div>
              <div className="col-12 col-md-4">
                <Info
                  lable={t('ownerProfile.state')}
                  info={user.state}
                  icon={<FaCity className="yellowcolor" />}
                />
              </div>
              <div className="col-12 col-md-4">
                <Info
                  lable={t('ownerProfile.city')}
                  info={user.city}
                  icon={<FaCity className="yellowcolor" />}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-12 col-md-4">
                <Info
                  lable={t('ownerProfile.plateNumber')}
                  info={user.plateNumber}
                  icon={
                    <LiaCarSideSolid className="me-1 mb-1 text-center yellowcolor fs-3 " />
                  }
                />
              </div>
              <div className="col-12 col-md-4">
                <Info
                  lable={t('ownerProfile.carType')}
                  info={t('ownerProfile.car')}
                  icon={
                    <LiaCarSideSolid className="me-1 mb-1 text-center yellowcolor fs-3 " />
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
