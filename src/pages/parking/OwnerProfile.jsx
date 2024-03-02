import Photoprofile from "../../components/profile/photoprofile";
import ViewProfile from "./ViewProfile";
export default function OwnerProfile() {
  return (
    <>
      <div>
        <Photoprofile/>
      </div>
      <div className={`row`}></div>
      <ViewProfile />
    </>
  );
}
