import React from "react";
import { TbLogout } from "react-icons/tb";
import { sidebar_nav_elements } from "../../../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {

    const navigate = useNavigate();



    const logout = async () =>{
        toast.loading('logging out...' , {theme : 'dark' , position : 'top-left'})
        await new Promise((resolve) =>{
            setTimeout(() => {
                resolve()
            }, 1000);
        })

        toast.dismiss();
        toast.success('Loggout successfully' , {theme : 'dark' , position:'top-left'})
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }

  return (
    <div className="fixed w-[10vw] h-screen top-0 bg-[#ffffff]">
      <header className="flex justify-center items-center gap-4 mt-4" >
        <p className="bg-[#ecf39e] px-2 py-1 text-xl rounded-md font-semibold">S</p>
        <p className="font-semibold text-xl" >Schoolify</p>
      </header>

        <main className="pl-3 mt-12">
            {sidebar_nav_elements?.map((Element , id) =>(
                <div key={id} className="flex items-center gap-2 my-8 cursor-pointer" >
                    <p>{<Element.icon/>}</p>
                    <p className="capitalize" >{Element.link}</p>
                </div>
            ))}
        </main>

      <footer onClick={logout} className="flex items-center gap-2 border absolute w-full bottom-0 py-4 justify-center cursor-pointer bg-[#4f772d] text-white">
        <p>
          <TbLogout />
        </p>
        <p>Logout</p>
      </footer>
      <ToastContainer/>
    </div>
  );
};

export default Sidebar;
