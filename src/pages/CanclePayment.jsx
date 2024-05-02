import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CancelPayment() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return (
    <>
      <div
        className="vh-75 d-flex justify-content-center align-items-center my-5"
        style={{ minHeight: "150vw" }}
      >
        <div className="col-md-4">
          <div className="border border-3 border-danger"></div>
          <div className="card  bg-white shadow p-5">
            <div className="mb-4 text-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                width="100px"
                height="100px"
              >
                <path
                  fill="#f78f8f"
                  d="M40 49.007L15.714 73.293 6.707 64.286 30.993 40 6.707 15.714 15.714 6.707 40 30.993 64.286 6.707 73.293 15.714 49.007 40 73.293 64.286 64.286 73.293z"
                />
                <path
                  fill="#c74343"
                  d="M15.714,7.414l23.578,23.578L40,31.7l0.707-0.707L64.286,7.414l8.3,8.3L49.007,39.293L48.3,40 l0.707,0.707l23.578,23.579l-8.3,8.3L40.707,49.007L40,48.3l-0.707,0.707L15.714,72.586l-8.3-8.3l23.579-23.579L31.7,40 l-0.707-0.707L7.414,15.714L15.714,7.414 M64.286,6L40,30.286L15.714,6L6,15.714L30.286,40L6,64.286L15.714,74L40,49.714L64.286,74 L74,64.286L49.714,40L74,15.714L64.286,6L64.286,6z"
                />
              </svg>
            </div>
            <div className="text-center ">
              {/* <h1>شكرًا لك!</h1> */}
              <p>{t("cancel")}</p>
              {/* <button className="btn btn-outline-success">Back Home</button> */}
              <p>{t("main")}</p>
              <Spinner animation="border" variant="danger" size="lg" />;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
