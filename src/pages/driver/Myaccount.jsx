import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Info from "../../components/profile/Info";
export default function Myaccount() {
  return (
    <>
      {/* الملف الشخصي */}
      <div className="row w-100">
        <p className="fs-1 fw-bolder m-2 py-4 "> البيانات الشخصية </p>

        <div className=" my-4  justify-content-around d-lg-flex gap-4">
          <Info lable="الاسم" info="اسراء فتحي احمد" icon={<FaUserPen />} />
          <Info lable="الايميل" info="esraa@gmail.com" icon={<MdEmail />} />
          <Info lable="الهاتف" info="01023456789" icon={<FaPhone />} />
          <Info lable="رقم الهوية" info="01234567891234" icon={<FaPhone />} />
        </div>
      </div>
    </>
  );
}
