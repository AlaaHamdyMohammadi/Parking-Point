import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/register";
import Layout from "./layout/Layout";
import HandelErorr from "./pages/handelErorr";
import AddParking from "./pages/parking/AddParking";
import OwnerProfile from "./pages/parking/OwnerProfile";
import Profile from "./pages/profile";
import Myaccount from './pages/driver/Myaccount';
import Editaccount from './pages/driver/Editaccount';
import ParkingHome from "./pages/parking/ParkingHome";
import EditProfile from "./pages/parking/EditProfile";
import Dashboard from "./pages/parking/Dashboard";
import RegistLayout from "./layout/RegistLayout";
import Sales from "./pages/parking/Sales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home />, errorElement: <HandelErorr /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <RegistLayout />,
    children: [
      { path: "/التسجيل", element: <Register />, errorElement: <HandelErorr /> },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/لوحة_التحكم/:id", element: <Dashboard />,
        children: [
          { index: true, element: <ParkingHome />, errorElement: <HandelErorr /> },
          { path: "اضافة_موقف", element: <AddParking />, errorElement: <HandelErorr /> },
          { path: "تعديل_موقف/:ParkingId", element: <AddParking />, errorElement: <HandelErorr /> },
          { path: "صاحب_موقف/:id", element: <OwnerProfile />, errorElement: <HandelErorr /> },
          { path: "تعديل_حسابي", element: <EditProfile />, errorElement: <HandelErorr /> },
          { path: "مبيعاتك", element: <Sales />, errorElement: <HandelErorr /> },
        ]
      },
      // { path: "/التسجيل", element: <Register />, errorElement: <HandelErorr /> },
      {
        path: "/حسابي/:_id",
        element: <Profile />,
        errorElement: <HandelErorr />,
        children: [
          { index: true, element: <Myaccount /> },
          { path: "تعديل", element: <Editaccount />, errorElement: <HandelErorr /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div dir="rtl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
