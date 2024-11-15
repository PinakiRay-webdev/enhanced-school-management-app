import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import AdminDashboard from "./Pages/Users/Admin/Components/Dashboard/AdminDashboard";
import Navbar from "./Pages/Navbar/Navbar";
import Sidebar from "./Pages/Users/Admin/Components/sidebar/Sidebar";
import AddUsers from "./Pages/Add Users/AddUsers";
const App = () => {

  const endpoints = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <>
          <Sidebar/>
          <Navbar />
          <AdminDashboard />
        </>
      ),
    },
  ]);

  return (
    <div className="bg-[#e9ecef] h-screen">
      <RouterProvider router={endpoints}>
      </RouterProvider>
        <AddUsers/>
    </div>
  );
};

export default App;
