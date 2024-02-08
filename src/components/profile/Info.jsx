export default function Info({ lable, info, icon }) {
  return (
    <>
      <div className="card slide-in-right animate shadow border-0 " style={{ width: "18rem" }}>
        <p className="fs-4 fw-bold p-2">
          <span className="p-2">{icon}</span>
          <span>{lable}</span>
        </p>
        <p className="fs-5   ">{info}</p>
      </div>
    </>
  );
}
