import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import AdminStats from '../../Components/AdminStats/AdminStats';
import SubjectStats from './components/SubjectStats/SubjectStats';
const AdminDashboard = () => {

  const navigate = useNavigate();

  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  return (
    <div className={`${sidebarStatus ? "pl-[10vw]" : "pl-[5vw]"} transition-all duration-150 ease-in-out`} >
      <AdminStats/>
      <SubjectStats/>
    </div>
  )
}

export default AdminDashboard
