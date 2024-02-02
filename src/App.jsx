import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import NotFound from './components/NotFound'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {index: true, element: <Home />},
      {path:"*", element: <NotFound/>}
    ]
  },
])

function App() {
  return (
    <div dir='rtl'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
