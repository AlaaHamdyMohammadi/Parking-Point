import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  let goBack = () => {
    navigate(-1);
  };
  return (
    <main style={{ height: "175vw" }}>
      <h2 className="text-center">الصفحة غير موجودة</h2>
      <div className="d-flex justify-content-center">
        <img src="/images/404-error.png" className="w-25" alt="" />
      </div>
      {/*  */}
      <main>
        <div className="d-flex justify-content-around">
          <div>
            <Link
              to={`/`}
              className="text-decoration-none btn btn-outline-warning text-dark"
            >
              الصفحة الرئيسية
            </Link>
          </div>
          <div>
            <button
              onClick={goBack}
              className="text-decoration-none btn btn-outline-warning text-dark"
            >
              الرجوع
            </button>
          </div>
        </div>
      </main>
    </main>
  );
}
