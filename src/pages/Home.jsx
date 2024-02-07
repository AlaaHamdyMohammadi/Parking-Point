import { useState } from "react";
import HomeLogout from './../components/HomeLogout';
import HomeLogin from './../components/driver/HomeLogin';
import ParkingHome from "./parking/ParkingHome";

export default function Home() {
  const [auth, setAuth] = useState(false);
  return (
    <>
    <HomeLogin />
      {auth && <HomeLogin />}
      {auth && <HomeLogout />}
      <ParkingHome/>
    </>
  );
}
