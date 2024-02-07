import { Outlet } from "react-router-dom";
// import Footer from "../components/Footer";
import Header from "../components/header/Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
