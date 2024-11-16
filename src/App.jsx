import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AdminDashboard from './Pages/Users/Admin/Pages/Dashboard/AdminDashboard'
import { AddFormSlice } from './redux/slice/AddFormSlice'
import AddUsers from './Pages/Users/Admin/Components/Add Users/AddUsers'
const App = () => {

  const endPoints = createBrowserRouter([
    {
      path : '/',
      element : <><Login/></>
    },
    {
      path : '/admin/dashboard',
      element :  <>
      <Navbar/>
      <Sidebar/>
      <AdminDashboard/>
      </> 
    }
  ])

  return (
    <div className='bg-gray-200 h-screen' >
      <RouterProvider router={endPoints}>

      </RouterProvider>
      <AddUsers/>
    </div>
  )
}

export default App
