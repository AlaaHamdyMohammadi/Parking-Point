import classes from "./../../styles/header.module.css";
import SearchInput from "../driver/SearchInput";
export default function HomeLogout() {
  return (
    <div className={`container-fluid`}>
      <div className={`row`}>
        <div className={`col-12 col-md-6 d-flex align-items-center bgColor justify-content-center`}>
          <div className={`w-75`}>
            <div className={`fs-3 mb-5 text-light`}>اركن في أقرب موقف لك</div>
            <SearchInput />
          </div>
        </div>
        <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center bgColor`}>
          <img src="./images/cars.png" className={`w-75`} alt="" />
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center `}>
          <img src="./images/Parking.gif" className={`w-75 rounded`} alt="" />
        </div>
        <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center`}>
          <div className={`col-7`}>
            <div className={`fs-1 fw-bold mb-3`}>نبذه عنا</div>
            <div className={`${classes.font}`}>
              موقع الكتروني لحجز مواقف للسيارات هو نظام يستخدم لحجز المواقف المتاحة من قبل المنازل و المباني وتيسير عملية
              حجزها. يهدف المشروع إلى تحسين تجربة مستخدمي السيارات في العثور على مواقف بشكل أكثر فعالية. يسمح للمستخدمين
              برؤية المواقف الشاغرة وحجزها عبر هواتفهم. المشروع يعتمد على موقع الكتروني للكشف عن توفرها، مما يتيح للسائقين
              معرفة المواقف الفارغة قبل وصولهم إلى المكان. ويظهر لهم المواقف الشاغرة بشكل فعال. تتضمن الخدمة أيضًا نظام دفع
              آمن يتيح للمستخدمين دفع رسوم الاستخدام أو حجز المواقف عبر الموقع الالكتروني. يعمل المشروع على توفير مواقف
              للسيارات بشكل أمن وتجنب الوقوف العشوائي في المناطق.المزدحمة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
