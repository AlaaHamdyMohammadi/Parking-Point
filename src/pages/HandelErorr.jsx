import { Link, useNavigate } from "react-router-dom";

export default function HandelErorr() {
  let navigate = useNavigate();
  let goBack = () => {
    navigate(-1);
  };
  return (
    <main className="pb-3">
      <h2 className="text-center">للأسف حدث خطا</h2>
      <h5 className="text-center mt-md-4">
        يرجي العودة في وقت اخر او التواصل مع فريق الدعم
      </h5>
      <div className="d-flex justify-content-center">
        <img
          src="/images/error-Service-Unavailable.png"
          className="w-25"
          alt=""
        />
      </div>
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
