import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/register";
import Layout from "./layout/Layout";
import HandelErorr from "./pages/handelErorr";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {index: true, element: <Home />, errorElement:<HandelErorr/>},
      {path:"*", element: <NotFound/>}
    ]
  },
  {
    element: <Layout />,
    children: [
      { path: "/register", element: <Register />, errorElement:<HandelErorr/> },
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
