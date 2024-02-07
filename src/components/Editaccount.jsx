import React from "react";

export default function Editaccount() {
  return (
    <>
      {/* تعديل الملف الشخصي */}
      <div className="row align-self-start w-100">
        <div className="form-group mb-3 ms-3">
          <label htmlFor="exampleInputSecondName" className="mb-1">
            <small className="fw-bold">Email</small>
          </label>
          <input
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="form-control border-dark rounded-0 me-5 shadow-none "
            id="exampleInputSecondName"
            placeholder="Email *"
          />
        </div>
      </div>
    </>
  );
}
