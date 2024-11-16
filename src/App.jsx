import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AdminDashboard from './Pages/Users/Admin/Pages/Dashboard/AdminDashboard'
import AddUsers from './Pages/Users/Admin/Components/Add Users/AddUsers'
import StudentList from './Pages/Users/Admin/Pages/Student lists/StudentList'
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
    },
    {
      path : '/admin/students',
      element : <>
        <Navbar/>
        <Sidebar/>
        <StudentList/>
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
