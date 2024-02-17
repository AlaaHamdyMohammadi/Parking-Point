import { useState } from "react";
import HomeLogout from "../components/home/HomeLogout";
import HomeLogin from "./../components/driver/HomeLogin";

export default function Home() {
  const [auth, setAuth] = useState(false);
  return (
    <>
      {/* esssss */}
      <HomeLogin />
      {auth && <HomeLogout />}
    </>
  );
}
