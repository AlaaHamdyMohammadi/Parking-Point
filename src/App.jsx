import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/register";
// import Test from "./pages/test";
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {index: true, element: <Home />},
      {path:"*", element: <NotFound/>}
    ]
  },
  {
    element: <Layout />,
    children: [
      { path: "/register", element: <Register /> },
      // { path: "/test", element: <Test /> },
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
