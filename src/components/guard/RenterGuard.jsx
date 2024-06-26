/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogInUserData from "../../../hook/useLogInUserData";

export default function RenterGuard({ children }) {
  const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
  const user = useLogInUserData();
  if (isLoggedIn == false) {
    return <Navigate to="/register" />;
  } else if (user.role === "driver" || user.isActivated == false || user.isEmailConfirmed == false) {
    return <Navigate to="**" />;
  } else {
    return children;
  }
}
