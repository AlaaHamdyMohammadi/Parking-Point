import React from "react";

export default function InputEdit({ label, placeholder, type }) {
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="exampleInputSecondName" className="mb-1 fs-3">
          <small className="fw-bold">{label}</small>
        </label>
        <input
          type={type}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          className="form-control rounded-3 border border-secondary  shadow-none "
          id="exampleInputSecondName"
          placeholder={placeholder}
        />
      </div>
    </>
  );
}
