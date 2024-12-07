import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminDashboard from "./Pages/Users/Admin/Pages/Dashboard/AdminDashboard";
import AddUsers from "./Pages/Users/Admin/Components/Add Users/AddUsers";
import StudentList from "./Pages/Users/Admin/Pages/Student lists/StudentList";
import TeacherList from "./Pages/Users/Admin/Pages/Teacher Lists/TeacherList";
import Profile from "./components/Profile/Profile";
import StudentDashboard from "./Pages/Users/Student/Pages/Dashboard/StudentDashboard";
import EditUsers from "./Pages/Users/Admin/Components/Edit Users/EditUsers";
import StudentSidebar from "./Pages/Users/Student/components/SideBar/StudentSideBar";
import MentorSidebar from "./Pages/Users/Mentor/Components/Side bar/MentorSideBar";
import StudentEditProfile from "./Pages/Users/Student/Pages/EditProfile/StudentEditProfile";
import MentorDashboard from "./Pages/Users/Mentor/Pages/Dashboard/MentorDashboard";

const App = () => {
  const endPoints = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <AdminDashboard />
        </>
      ),
    },
    {
      path: "/admin/students",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <StudentList />
        </>
      ),
    },
    {
      path: "/admin/student/profile/:id",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <Profile />
        </>
      ),
    },
    {
      path: "/admin/mentor/profile/:id",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <Profile />
        </>
      ),
    },
    {
      path: "/admin/teachers",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <TeacherList />
        </>
      ),
    },
    {
      path: "/student/dashboard",
      element: (
        <>
          <Navbar />
          <StudentSidebar />
          <StudentDashboard />
        </>
      ),
    },
    {
      path: "/mentor/dashboard",
      element: (
        <>
          <Navbar />
          <MentorSidebar />
          <MentorDashboard />
        </>
      ),
    },
    {
      path: "/mentor/students",
      element: (
        <>
          <Navbar />
          <MentorSidebar />
          <StudentList />
        </>
      ),
    },
    {
      path: "/mentor/student/profile/:id",
      element: (
        <>
          <Navbar />
          <MentorSidebar />
          <Profile />
        </>
      ),
    },
    {
      path: "student/profile/:id",
      element: (
        <>
          <Navbar />
          <StudentSidebar />
          <Profile />
        </>
      ),
    },
    {
      path: "mentor/profile/:id",
      element: (
        <>
          <Navbar />
          <MentorSidebar />
          <Profile />
        </>
      ),
    },
    {
      path: "/student/profile/edit/:id",
      element: (
        <>
          <Navbar />
          <StudentSidebar />
          <StudentEditProfile />
        </>
      ),
    },
  ]);

  return (
    <div className="bg-gray-200 h-screen">
      <RouterProvider router={endPoints}></RouterProvider>
      <AddUsers />
    </div>
  );
};

export default App;
