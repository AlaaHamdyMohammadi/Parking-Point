import Photoprofile from "../../components/profile/photoprofile";
import ViewProfile from "./ViewProfile";
import useLogInUserData from "../../../hook/useLogInUserData";
export default function OwnerProfile() {
  const user = useLogInUserData();
  return (
    <>
      <div className={`  `}>
        <Photoprofile
          photo={`/images/defaultpersonjpg.jpg`}
          time={`عضو منذ ${new Date(user.createdAt).toLocaleDateString()}`}
        />
      </div>
      <div className={`row`}></div>
      <ViewProfile />
    </>
  );
}
