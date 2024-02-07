
export default function Info({lable,info,icon}) {
  return (
    <>
        <div className="  p-2 ">
            <p className="fs-2 fw-bold ">
              <span className="p-2">
                {icon}
              </span>
              <span>
              {lable}
              </span>
            </p>
            <p className="fs-5   ">{info}</p>
            <div className=" border-bottom w-50 "></div>
          </div>
    </>
  )
}



