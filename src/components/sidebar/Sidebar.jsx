import React from 'react'
import { sidebar_nav_elements } from '../../utils/utils'
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import  'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {

    const navigate = useNavigate()

    const sideBarStatus = useSelector((state) => state.sidebar.isOpen)

    const delay = () =>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }



    const logout = () =>{
        toast.promise(delay , {
            pending : 'logging out...',
            success : 'loggout successfully',
        } , {theme : 'dark' , position:"top-left" }).then(() =>{
            setTimeout(() => {
                navigate('/')
            }, 1500);
            localStorage.clear()
        })
    }

  return (
    <div className={`h-screen fixed top-0 ${sideBarStatus ? "w-[10vw]" : "w-[5vw]"} bg-white transition-all duration-150 ease-in-out`} >
      <header className='flex justify-center items-center gap-3 mt-2' >
        <p className='text-2xl font-semibold py-1 px-3 rounded-md bg-[#a7c957]' >S</p>
        <p className={`text-lg ${sideBarStatus ? "block" : "hidden"} `} >Schoolify</p>
      </header>

      <main>
        {sidebar_nav_elements?.map((Element , id) =>(
            <div key={id} className={`py-4 mt-8 flex items-center gap-3 cursor-pointer ${sideBarStatus ? "pl-4" : "justify-center"} `} >
                <p className='text-xl' >{<Element.icon/>}</p>
                <p className={`capitalize ${sideBarStatus ? "block" : "hidden"}`} >{Element.link}</p>
            </div>
        ))}
      </main>

      <footer onClick={logout} className={`absolute bottom-0 flex items-center justify-center gap-2 text-white bg-[#4f772d] w-full py-3 cursor-pointer`} >
        <p className='text-xl' ><IoIosLogOut/></p>
        <p className={`${sideBarStatus ? "bloxk" : 'hidden'}`} >Logout</p>
      </footer>
      <ToastContainer />
    </div>
  )
}

export default Sidebar
