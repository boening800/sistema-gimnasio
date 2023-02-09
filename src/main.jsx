import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'

import './firebase'
import Root from './pages/Root'
import Users from './pages/Users'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'users',
        element: <Users />
      }
    ]
  },
  {
    path:'login',
    element: <Login/>,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <>
    <RouterProvider router={router}/>
    </>
  // </React.StrictMode>,
)
