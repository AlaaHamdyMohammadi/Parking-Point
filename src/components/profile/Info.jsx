export default function Info({ lable, info, icon }) {
  return (
    <>
      <div className="card slide-in-right animate shadow border-0 " style={{ width: "15rem" }}>
        <p className=" fw-bold p-2">
          <span className="p-2 ">{icon}</span>
          <span>{lable}</span>
        </p>
        <p className="px-3">{info}</p>
      </div>
    </>
  );
}
