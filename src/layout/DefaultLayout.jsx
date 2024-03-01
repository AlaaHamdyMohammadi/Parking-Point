import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet className="h-100" />
      <Footer />
    </>
  );
}
