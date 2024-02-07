import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/register";
import Layout from "./layout/Layout";
import HandelErorr from "./pages/handelErorr";
import AddParking from "./pages/parking/AddParking";
import ParkingDashboard from "./pages/parking/ParkingDashboard";
import Profile from "./pages/profile";
import Myaccount from './pages/driver/Myaccount';
import Editaccount from './pages/driver/Editaccount';

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
    element: <Layout />,
    children: [
      { path: "/التسجيل", element: <Register />, errorElement:<HandelErorr/> },
      { path: "/add_parking", element: <AddParking />, errorElement:<HandelErorr/> },
      { path: "/dashboard", element: <ParkingDashboard />, errorElement:<HandelErorr/> },
      { path: "/التسجيل", element: <Register />, errorElement: <HandelErorr /> },
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
