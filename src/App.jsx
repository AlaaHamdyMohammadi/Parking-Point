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
import EditProfile from "./pages/parking/EditProfile";
import Dashboard from "./pages/parking/Dashboard";
import RegistLayout from "./layout/RegistLayout";
import Sales from "./pages/parking/Sales";
import Guard from "./components/guard/Guard";
import LoginGuard from "./components/guard/LoginGuard";
import RenterGuard from "./components/guard/RenterGuard";
import Fqa from "./pages/FQA";
import LiveLocation from "./pages/Map";
import Terms from "./pages/Terms";
import CancelPayment from "./pages/CanclePayment";
import ParkDetials from "./pages/parking/parkDetials";
import SuccessPayment from "./pages/SuccessPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home />, errorElement: <HandelErorr /> },
      { path: "/Terms", element: <Terms />, errorElement: <HandelErorr /> },
      {
        path: "/ParkDetials/",
        element: <ParkDetials />,
        errorElement: <HandelErorr />,
      },

      {
        path: "/CancelPayment",
        element: <CancelPayment />,
        errorElement: <HandelErorr />,
      },

      {
        path: "/SuccessPayment",
        element: <SuccessPayment />,
        errorElement: <HandelErorr />,
      },

      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <RegistLayout />,
    children: [
      {
        path: "/register",
        element: (
          <LoginGuard>
            <Register />
          </LoginGuard>
        ),
        errorElement: <HandelErorr />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "Profile",
        element: (
          <Guard>
            <Dashboard />
          </Guard>
        ),
        errorElement: <HandelErorr />,

        children: [
          {
            index: true,
            element: (
              <Guard>
                <OwnerProfile />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "parking",
            element: (
              <RenterGuard>
                <AddParking />
              </RenterGuard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "parking/:ParkingId",
            element: (
              <RenterGuard>
                <AddParking />
              </RenterGuard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "editOwnerProfile",
            element: (
              <Guard>
                <EditProfile />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "sales",
            element: (
              <Guard>
                <Sales />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "FQA",
            element: (
              <Guard>
                <Fqa />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
        ],
      },
    ],
  },
  { path: "/map", element: <LiveLocation /> },
]);

function App() {
  return (
    <div dir="rtl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
