import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Guard({ children }) {
  const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
  
  if (isLoggedIn == false) {
    return <Navigate to="/register" />;
  } else {
    return children;
  }
}
