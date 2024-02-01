import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/register";
import Test from "./pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/test", element: <Test /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
