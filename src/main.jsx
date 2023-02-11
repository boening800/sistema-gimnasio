import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CFallback from './components/CFallback'

const Root = React.lazy(()=>import( './pages/Root'))
const ErrorPage = React.lazy(()=>import( './pages/ErrorPage'))
const Login = React.lazy(()=>import( './pages/Login'))
const Dashboard = React.lazy(()=>import( './pages/Dashboard'))
const Users = React.lazy(()=>import( './pages/Users'))

const router = createBrowserRouter([
  {
    path:'/',
    element: 
    <React.Suspense fallback={<CFallback/>}>
      <Root/>
    </React.Suspense>,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'users',
        element: 
        <React.Suspense fallback={<CFallback/>}>
          <Users />
        </React.Suspense>
      },
      {
        path:'dashboard',
        element: 
        <React.Suspense fallback={<CFallback/>}>
          <Dashboard />
        </React.Suspense>
      }
    ]
  },
  {
    path:'login',
    element: 
    <React.Suspense fallback={<CFallback/>}>
      <Login/>
    </React.Suspense>
    ,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <RouterProvider router={router}/>
  // </React.StrictMode>,
)
