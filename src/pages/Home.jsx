/* eslint-disable no-unused-vars */
import { useState } from "react";
import HomeLogout from "../components/home/HomeLogout";
import HomeLogin from "./../components/driver/HomeLogin";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
  return <>{isLoggedIn ? <HomeLogin /> : <HomeLogout />}</>;
}
