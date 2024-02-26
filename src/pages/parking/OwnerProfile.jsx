import { Outlet } from "react-router-dom";
import Photoprofile from "../../components/profile/photoprofile";

export default function OwnerProfile() {
  return (
    <>
      <div className={`  `}>
        <Photoprofile photo={`/images/defaultpersonjpg.jpg`} time={`عضو منذ 5 اسابيع`} />
      </div>
      <div className={`row`}></div>
      <Outlet />
    </>
  );
}
