import { LiaCarSideSolid } from "react-icons/lia";

export default function Sales() {
  return (
    <div className="mt-5">
      <table className="table">
  <thead className="bgColor text-white fw-bold py-3">
      <th className="">
      <LiaCarSideSolid className="me-1 mb-1 text-white fs-1 bgColor"/>
      </th>
      <th className="p-3">رقم اللوحة</th>
      <th className="p-3">الحجز من</th>
      <th className="p-3">الحجز الي</th>
  </thead>
  <tbody>
    <tr>
      <td className="p-3">1</td>
    <td className="p-3">
      <span>123456</span>
    </td>
    <td className="p-3">9-2-2024 5pm</td>
    <td className="p-3">9-2-2024 7pm</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}
