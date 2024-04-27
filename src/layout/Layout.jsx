import { Outlet } from "react-router-dom";
import Header_2 from "../components/header/Header_2";
import Footer from "../components/footer/Footer";

export default function Layout() {
  return (
    <div>
      <Header_2 />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
