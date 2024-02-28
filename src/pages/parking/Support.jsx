import { useState } from "react";
import axiosInstanceParking from "../../axiosConfig/instanc";
export default function Support() {

  const [support, setSupport] = useState({
    name: "",
    phone: "",
    whatsAppPhone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    nameErrors: "",
    phoneErrors: "",
    whatsAppPhoneErrors: "",
    emailErrors: "",
    messageErrors: "",
  });

  function validation(event) {
    if (event.target.name === "name") {
      setErrors({ ...errors, nameErrors: event.target.value.length === 0 ? "يجب إضافة الاسم" : "" });
      setSupport({ ...support, name: event.target.value });

    }
    if (event.target.name === "phone") {
      setErrors({ ...errors, phoneErrors: event.target.value.length === 0 ? "يجب ادخال رقم الجوال" : "" });
      setSupport({ ...support, phone: event.target.value });
    }
    if (event.target.name === "whatsAppPhone") {
      setErrors({ ...errors, whatsAppPhoneErrors: event.target.value.length === 0 ? "يجب ادخال رقم الواتساب" : "" });
      setSupport({ ...support, whatsAppPhone: event.target.value });
    }
    if (event.target.name === "email") {
      setErrors({ ...errors, emailErrors: event.target.value.length === 0 ? "يجب ادخال الايميل" : "" });
      setSupport({ ...support, email: event.target.value });
    }
    if (event.target.name === "message") {
      setErrors({
        ...errors, messageErrors: event.target.value.length === 0
          ? "يجب ادخال رسالة"
          : /^[A-Za-z0-9\u0600-\u06FF]{30,}$/.test(event.target.value)
            ? ""
            : "يجب ادخال 30 حرف بحد ادني"
      });
      setSupport({ ...support, message: event.target.value });
    }
  }

  function handleSubmit(event) {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const isEmpty = Object.values(support).some((support) => support === "");
    if (hasErrors || isEmpty) {
      event.preventDefault();
    } else {
      event.preventDefault();

      axiosInstanceParking.post(`/`, support).then((res) => {
        console.log("support request successful", res.data);
      })
        .catch((err) => {
          console.error("Error during support request:", err);
        });
    }
    console.log(support);
  }
  return (
    <div className="container my-3">
      <h2>الدعم الفني</h2>
      <div className={`card w-75 p-2`}>
        <div className={`p-5`}>
          <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="name" className="mb-1 fs-3">
                  <small className="fw-bold">الاسم</small>
                </label>
                <input onChange={validation} onBlur={validation} type="text"
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="name" placeholder="" name="name" value={support.name} />
                <p className="text-danger text-center">{errors.nameErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="email" className="mb-1 fs-3">
                  <small className="fw-bold">الايميل</small>
                </label>
                <input onChange={validation} onBlur={validation} type="email"
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="email" placeholder="" name="email" value={support.email} />
                <p className="text-danger text-center">{errors.emailErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6">
                <label htmlFor="phone" className="mb-1 fs-3">
                  <small className="fw-bold">رقم الجوال</small>
                </label>
                <input onChange={validation} onBlur={validation} type="text"
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="phone" placeholder="" name="phone" value={support.phone} />
                <p className="text-danger text-center">{errors.phoneErrors}</p>
              </div>
              <div className="form-group mb-3 col-12 col-md-6 ">
                <label htmlFor="whatsAppPhone" className="mb-1 fs-3">
                  <small className="fw-bold">واتساب</small>
                </label>
                <input onChange={validation} onBlur={validation} type="text"
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="whatsAppPhone" placeholder="" name="whatsAppPhone" value={support.whatsAppPhone} />
                <p className="text-danger text-center">{errors.whatsAppPhoneErrors}</p>
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="message" className="mb-1 fs-3">
                  <small className="fw-bold">الرسالة</small>
                </label>
                <textarea onChange={validation} onBlur={validation}
                  className="form-control rounded-3 border border-secondary  shadow-none "
                  id="message" placeholder="" name="message" value={support.message}>

                </textarea>
                <p className="text-danger text-center">{errors.messageErrors}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <input
                type="submit"
                value={`ارسل الطلب`}
                className={
                  Object.values(errors).some((error) => error !== "")
                    ? "btn bgColor text-white col-4 disabled"
                    : "btn bgColor text-white col-4 "
                }
                disabled={Object.values(support).some((support) => support == "")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
