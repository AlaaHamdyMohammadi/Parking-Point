import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Info from "../../components/profile/Info";
export default function Myaccount() {
  return (
    <>
      {/* الملف الشخصي */}
      <div className="row align-self-start w-100">
        <div className=" mt-5 ">
          <p className="fs-1 fw-bolder m-2 py-4 "> البيانات الشخصية </p>
          <Info lable="الاسم" info="اسراء فتحي احمد" icon={<FaUserPen />} />
          <Info lable="الايميل" info="esraa@gmail.com" icon={<MdEmail />} />
          <Info lable="الهاتف" info="01023456789" icon={<FaPhone />} />
        </div>
      </div>
    </>
  );
}
