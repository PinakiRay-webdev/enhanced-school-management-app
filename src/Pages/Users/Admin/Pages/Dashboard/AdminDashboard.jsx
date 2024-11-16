import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminStats from '../../Components/AdminStats/AdminStats';
const AdminDashboard = () => {

  const navigate = useNavigate();


  return (
    <div className='pl-[10vw]' >
      <AdminStats/>
    </div>
  )
}

export default AdminDashboard
