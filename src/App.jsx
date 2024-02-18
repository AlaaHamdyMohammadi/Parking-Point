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

import Myaccount from "./pages/driver/Myaccount";
import Editaccount from "./pages/driver/Editaccount";
import ParkingHome from "./pages/parking/ParkingHome";
import EditProfile from "./pages/parking/EditProfile";
import Dashboard from "./pages/parking/Dashboard";
import RegistLayout from "./layout/RegistLayout";
import Sales from "./pages/parking/Sales";
import ViewProfile from "./pages/parking/ViewProfile";
import Profile from "./pages/driver/profile";
import MyTrips from "./pages/driver/mytrips";
import Support from "./pages/driver/Support";
import Map from "./pages/Map";
import Guard from "./components/guard/Guard";

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
        element: <Register />,
        errorElement: <HandelErorr />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "dashboard/:ownerId",
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
                <ParkingHome />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "add_parking",
            element: (
              <Guard>
                <AddParking />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            path: "edit_parking/:ParkingId",
            element: (
              <Guard>
                <AddParking />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },

          {
            path: "Owneraccount/",
            element: (
              <Guard>
                <OwnerProfile />
              </Guard>
            ),
            children: [
              {
                path: "ownerProfile",
                element: (
                  <Guard>
                    <ViewProfile />
                  </Guard>
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
            ],
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

      {
        path: "/Driveraccount/:DriverId/",
        element: (
          <Guard>
            <Profile />
          </Guard>
        ),
        errorElement: <HandelErorr />,
        children: [
          {
            path: "MyTrips",
            element: (
              <Guard>
                <MyTrips />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
          {
            index: true,
            element: (
              <Guard>
                <Myaccount />
              </Guard>
            ),
          },
          {
            path: "editDriverProfile",
            element: (
              <Guard>
                <Editaccount />
              </Guard>
            ),
            errorElement: <HandelErorr />,
          },
        ],
      },
    ],
  },
  { path: "map", element: <Map /> },
]);

function App() {
  return (
    <div dir="rtl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
