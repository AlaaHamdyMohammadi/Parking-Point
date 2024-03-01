import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <div style={{minHeight:'32.2vw'}}>
      <Outlet />
      </div>
      <Footer />
    </>
  );
}
