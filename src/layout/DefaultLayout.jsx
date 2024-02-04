import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <div className={`m-5`}>
      <Outlet />
      </div>
      <Footer />
    </>
  );
}
