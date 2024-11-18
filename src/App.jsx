import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AdminDashboard from './Pages/Users/Admin/Pages/Dashboard/AdminDashboard'
import AddUsers from './Pages/Users/Admin/Components/Add Users/AddUsers'
import StudentList from './Pages/Users/Admin/Pages/Student lists/StudentList'
import TeacherList from './Pages/Users/Admin/Pages/Teacher Lists/TeacherList'
import Profile from './components/Profile/Profile'
import StudentDashboard from './Pages/Users/Student/components/Dashboard/StudentDashboard'
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
    },
    {
      path : '/admin/teachers',
      element : <>
        <Navbar/>
        <Sidebar/>
        <TeacherList/>
      </>
    },
    {
      path : '/student/dashboard',
      element : <>
        <Navbar/>
        <Sidebar/>
        <StudentDashboard/>
      </>
    },
    {
      path : '/mentor/dashboard',
      element : <>
        <Navbar/>
        <Sidebar/>
        <StudentDashboard/>
      </>
    },
    {
      path : '/profile/:id',
      element : <>
        <Navbar/>
        <Sidebar/>
        <Profile/>
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
