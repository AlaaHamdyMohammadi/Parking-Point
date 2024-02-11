export default function SelectEdit({ label, option1, setState }) {
  const inputChang = (event) => {
    setState(event.target.value);
  };
  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="cars" className="mb-1 fs-5">
          <small className="fw-bold">{label}</small>
        </label>
        <select
          id="cars"
          name="cars"
          className="form-control border border-secondary rounded-3 shadow-none"
          onChange={inputChang}
        >
          <option value="car" name="car" hidden>
            اختر المركبة
          </option>
          <option value="car" name="car">
            {option1}
          </option>
        </select>
      </div>
    </>
  );
}
