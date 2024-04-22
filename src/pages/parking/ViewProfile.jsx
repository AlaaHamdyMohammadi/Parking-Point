import Info from "../../components/profile/Info";
import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import useLogInUserData from "../../../hook/useLogInUserData";
import { LiaCarSideSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";

export default function ViewProfile() {
  const user = useLogInUserData();
  console.log(user);
  return (
    <div className="row w-100 ">
      <p className="fs-3 fw-bold m-md-3 py-2 "> البيانات الشخصية </p>
      <div className="my-3 justify-content-center d-lg-flex d-block gap-4 flex-wrap">
        <div className="w-100 d-flex row">
          <div className="col-12 col-md-4">
            <Info
              lable="الاسم"
              info={`${user.firstName} ${user.lastName}`}
              icon={<FaUserPen className="yellowcolor fs-4" />}
            />
          </div>
          <div className="col-12 col-md-4">
            <Info
              lable="الايميل"
              info={user.email}
              icon={<MdEmail className="yellowcolor fs-4" />}
            />
          </div>
          <div className="col-12 col-md-4">
            <Info
              lable="الهاتف"
              info={user.phoneNumber}
              icon={<FaPhone className="yellowcolor fs-4" />}
            />
          </div>

          {user.role == "renter" ? (
            <>
              <div className="col-12 col-md-4">
                <Info
                  lable="المنطقه"
                  info={user.region}
                  icon={<FaCity className="yellowcolor" />}
                />
              </div>
              <div className="col-12 col-md-4">
                <Info
                  lable="المحافظه"
                  info={user.state}
                  icon={<FaCity className="yellowcolor" />}
                />
              </div>
              <div className="col-12 col-md-4">
                <Info
                  lable="الولاية"
                  info={user.city}
                  icon={<FaCity className="yellowcolor" />}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-12 col-md-4">
                <Info
                  lable="رقم اللوحة "
                  info={user.plateNumber}
                  icon={
                    <LiaCarSideSolid className="me-1 mb-1 text-center yellowcolor fs-3 " />
                  }
                />
              </div>
              <div className="col-12 col-md-4">
                <Info
                  lable="نوع المركبة"
                  info={user.carType}
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
