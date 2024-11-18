import React , {useEffect, useState, useRef} from 'react'
import { TbGridDots , TbDotsVertical , TbMessageChatbotFilled } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch , useSelector } from 'react-redux';
import { toggleSideBar } from '../../redux/slice/SideBarSlice';

import { useLocation,} from 'react-router-dom';
import { toggleAddForm } from '../../redux/slice/AddFormSlice';
import { getMentors, getStudents } from '../../redux/slice/UserSlice';

const Navbar = () => {

    const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

    const dispatch = useDispatch()
    const[currentLocation , setCurrentLocation] = useState("")

    const location = useLocation();

    const site = location.pathname.slice(location.pathname.lastIndexOf('/')+1)
    const admin = JSON.parse(localStorage.getItem("adminCredentials"))
    const student = JSON.parse(localStorage.getItem("studentCredentials"))
    const mentor = JSON.parse(localStorage.getItem("mentorCredentials"))

    
    const userMail = useRef(student || admin || mentor)
    const currentStudent = useSelector((state) => state.users.students.find((e) => e.Email === userMail.current.mail))
    const currentMentor = useSelector((state) => state.users.mentors.find((e) => e.Email === userMail.current.mail))


    useEffect(()=>{
        setCurrentLocation(site)
        dispatch(getStudents())
        dispatch(getMentors())
      },[site])
      
      const toggleSideBarMenu = () =>{
        dispatch(toggleSideBar())

    }

  return (
    <div className={`bg-white ${sidebarStatus ? "pl-[10vw]" : "pl-[5vw]"} transition-all duration-150 ease-in-out`} > 
      <div className='py-2 flex justify-between px-4' >
        {/* left side  */}
        <div className='flex items-center gap-4'>
        <p onClick={toggleSideBarMenu} className='cursor-pointer' >{sidebarStatus ? <TbGridDots/> : <TbDotsVertical/>}</p>
        <p className='capitalize text-xl font-semibold'>{currentLocation}</p>
        </div>

        {/* right side  */}
        <div className='flex items-center gap-8' >
            <p onClick={() => dispatch(toggleAddForm())} className='bg-[#4f772d] px-4 py-1 rounded-lg font-extralight text-white cursor-pointer' >+ Add new Users</p>
            <p className='text-2xl'><TbMessageChatbotFilled/></p>
            <p className='text-2xl'><IoNotifications/></p>
            <div className='flex gap-2 items-center' >
                <p className='text-2xl' >
                <FaUserCircle/>
                </p>
                <div>
                  <div className='flex items-center gap-1' >
                    <p className='text-sm font-bold' >{currentStudent?.FirstName || currentMentor?.FirstName || "Rohan"}</p>
                    <p className='text-sm font-bold' >{currentStudent?.LastName || currentMentor?.LastName || "Rohan"}</p>
                  </div>
                    <p className='text-sm opacity-70 font-semibold'>{userMail.current.mail}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
