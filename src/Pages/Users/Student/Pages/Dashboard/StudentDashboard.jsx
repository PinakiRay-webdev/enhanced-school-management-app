import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import StudentStats from './components/StudentStats'

const StudentDashboard = () => {

  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  return (
    <div className={`${sidebarStatus ? "pl-[10vw]" : "pl-[5vw]"}`} >
      <div className='px-4 py-2'>
        <StudentStats/>
      This is student dashboard
      </div>
    </div>
  )
}

export default StudentDashboard
