export default function InputEdit({ label, placeholder, type, setState }) {
  const inputChang = (event) => {
    setState(event.target.value);
  };

  return (
    <>
      <div className="form-group mb-3 w-100 ">
        <label htmlFor="exampleInputSecondName" className="mb-1 fs-5">
          <small className="fw-bold">{label}</small>
        </label>
        <input
          onChange={inputChang}
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
