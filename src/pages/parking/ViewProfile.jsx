import Info from "../../components/profile/Info";
import { MdEmail } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
export default function ViewProfile() {
  return (
    <>
      <div className="row w-90">
        <p className="fs-3 fw-bold m-2 py-2 "> البيانات الشخصية </p>

        <div className=" my-3  justify-content-around d-lg-flex gap-4">
          <Info lable="الاسم" info="اسراء فتحي احمد" icon={<FaUserPen className="yellowcolor" />} />
          <Info lable="الايميل" info="esraa@gmail.com" icon={<MdEmail className="yellowcolor" />} />
          <Info lable="الهاتف" info="01023456789" icon={<FaPhone className="yellowcolor" />} />
          <Info lable="رقم الهوية" info="01234567891234" icon={<FaPhone className="yellowcolor" />} />
        </div>
      </div>
    </>
  );
}
