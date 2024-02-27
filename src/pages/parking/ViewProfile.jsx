import Info from "../../components/profile/Info";
import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import useLogInUserData from "../../../hook/useLogInUserData";
export default function ViewProfile() {
  const user = useLogInUserData();
  return (
    <>
      <div className="row w-100 ">
        <p className="fs-3 fw-bold m-md-3 py-2 "> البيانات الشخصية </p>
        <div className=" d-lg-flex  justify-content-center gap-4 flex-wrap">
          <div className="w-100 mx-5 pe-5 d-flex">
            <Info lable="الاسم" info={`${user.firstName} ${user.lastName}`} icon={<FaUserPen className="yellowcolor" />} />
            <Info lable="الايميل" info={user.email} icon={<MdEmail className="yellowcolor" />} />
          </div>
          <div className="w-100 mx-5 pe-5  d-flex">
            <Info lable="الهاتف" info="01023456789" icon={<FaPhone className="yellowcolor" />} />
            <Info lable="رقم الهوية" info="01234567891234" icon={<FaPhone className="yellowcolor" />} />
          </div>
        </div>
      </div>
    </>
  );
}
