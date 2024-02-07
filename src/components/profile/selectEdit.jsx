import React from "react";

export default function SelectEdit({ label, option1 }) {
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="cars" className="mb-1 fs-3">
          <small className="fw-bold">{label}</small>
        </label>
        <select id="cars" name="cars" className="form-control border border-secondary rounded-3   shadow-none ">
          <option value="car">{option1}</option>
        </select>
      </div>
    </>
  );
}
