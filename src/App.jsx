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
import Support from "./pages/driver/Support";
import Map from "./pages/Map";
import RatingTest from "./pages/RatingTest";
import Guard from "./components/guard/Guard";
import LoginGuard from "./components/guard/LoginGuard";
import RenterGuard from "./components/guard/RenterGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home />, errorElement: <HandelErorr /> },
      { path: "support", element: <Support />, errorElement: <HandelErorr /> },
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
  {element: <Layout />,
    children: [
      {path: "Profile",
        element: (
          <Guard>
            <Dashboard />
          </Guard>
        ),
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
        ],
      },
    ],
  },
  { path: "map", element: <Map /> },
  { path: "rating", element: <RatingTest /> },
]);

function App() {
  return (
    <div dir="rtl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
