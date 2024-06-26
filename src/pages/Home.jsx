/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import HomeLogout from "../components/home/HomeLogout";
import HomeLogin from "./../components/driver/HomeLogin";
import { useSelector } from "react-redux";
import useLogInUserData from "../../hook/useLogInUserData";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
  return <>{isLoggedIn ? <HomeLogin /> : <HomeLogout />}</>;
}
