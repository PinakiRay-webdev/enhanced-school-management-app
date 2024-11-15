import React , {useEffect, useState, useRef} from 'react'
import { TbGridDots , TbDotsVertical , TbMessageChatbotFilled } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';

import { useLocation,} from 'react-router-dom';
import { toggleAddForm } from '../../redux/slice/AddFormSlice';

const Navbar = () => {

    const dispatch = useDispatch()
    const[currentLocation , setCurrentLocation] = useState("")

    const location = useLocation();

    const site = location.pathname.slice(location.pathname.lastIndexOf('/')+1)
    const admin = JSON.parse(localStorage.getItem("adminCredentials"))
    const student = JSON.parse(localStorage.getItem("studentCredentials"))
    const mentor = JSON.parse(localStorage.getItem("mentorCredentials"))

    const userMail = useRef(student || admin || mentor)

    useEffect(()=>{
        setCurrentLocation(site)
    },[site])
    

  return (
    <div className='bg-white pl-[10vw]' > 
      <div className='py-2 flex justify-between px-4' >
        {/* left side  */}
        <div className='flex items-center gap-4'>
        <p><TbGridDots/></p>
        <p className='capitalize'>{currentLocation}</p>
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
                    <p className='text-sm font-bold' >Rohan Ray</p>
                    <p className='text-sm opacity-70 font-semibold'>{userMail.current.mail}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
