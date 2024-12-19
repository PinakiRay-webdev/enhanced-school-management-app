import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import StudentStats from './components/StudentStats'
import StudentPerformance from './components/Performance/StudentPerformance'
import Calender from './components/calender/Calender'

const StudentDashboard = () => {

  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  return (
    <div className={`h-[90vh] overflow-y-hidden ${sidebarStatus ? "pl-[10vw]" : "pl-[5vw]"}`} >
      <div className='px-4 py-3 grid grid-cols-5 grid-rows-5'>
        <StudentStats/>
        <Calender/>
        <StudentPerformance/>
      </div>
    </div>
  )
}

export default StudentDashboard
