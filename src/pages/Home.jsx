import { useState } from "react";
import HomeLogin from "../components/HomeLogin";
import HomeLogout from "../components/HomeLogout";

export default function Home() {
  const [auth, setAuth] = useState(false);
  return (
    <>
      <HomeLogin />

      {auth && <HomeLogout />}
    </>
  );
}
