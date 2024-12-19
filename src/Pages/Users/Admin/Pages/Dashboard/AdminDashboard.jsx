import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import AdminStats from '../../Components/AdminStats/AdminStats';
import SubjectStats from './components/SubjectStats/SubjectStats';
import DataStats from './components/DataStats/DataStats';
const AdminDashboard = () => {

  const navigate = useNavigate();

  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  return (
    <div className={`${sidebarStatus ? "pl-[10vw]" : "pl-[6vw]"} py-4 px-5 h-[90vh] transition-all duration-150 ease-in-out grid grid-cols-5 grid-rows-4 gap-3`} >
      <AdminStats/>
      <DataStats/>
      <SubjectStats/>
    </div>
  )
}

export default AdminDashboard
