import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import loginBg from './assets/loginBG.svg'
import google from './assets/google.svg'
import facebook from './assets/facebook.svg'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

  const {
    register,
    handleSubmit,
    formState:{errors}  
  } = useForm()



  const navigate = useNavigate()

  const admin_mail = import.meta.env.VITE_ADMIN_MAIL;
  const admin_pass = import.meta.env.VITE_ADMIN_PASSWORD

  const onSubmit = async (data) =>{
    try {
      toast.loading("Logging..." , {theme : "dark"})

      await new Promise((resolve , reject) =>{
        setTimeout(() => {
          // admin credentials
          if(data.usermail === admin_mail && data.userpass === admin_pass){
            localStorage.setItem("adminCredentials" , JSON.stringify({
              mail : data.usermail,
              role : "admin"
            }))
            resolve();
          } else {
            reject(new Error("Invalid credentials"))
          }
        }, 2000);
      });

      toast.dismiss();
      toast.success("Logged in successfully" , {theme : 'dark'})
      setTimeout(()=>{
        navigate('/admin/dashboard')
      },1000)
    } catch (error) {
      toast.dismiss();
      toast.error("Invalid credentials" , {theme : 'dark'})
    }
  }

  return (
    <div className='flex justify-between h-screen' >
      <div className='h-full flex items-center justify-center flex-1' >
        <div className='w-[25vw]' >
          <h1 className='font-semibold text-3xl text-center' >Welcome back</h1>
          <p className='text-md text-center opacity-70' >Login to your account</p>

          {/* social media section  */}
          <div className='flex justify-center w-full gap-12 my-6' > 
            <img className='w-10 cursor-pointer shadow-xl rounded-full' src={google} alt="" />
            <img className='w-10 cursor-pointer shadow-xl rounded-full' src={facebook} alt="" />
          </div>

        {/* horizontal line  */}
          <div className='flex justify-between items-center gap-3' >
            <div className='border border-black w-full h-0 opacity-30' ></div>
            <p>or</p>
            <div className='border border-black items-center gap-3 w-full opacity-30 '></div>
          </div>

          {/* form section  */}
          <form className='my-5' onSubmit={handleSubmit(onSubmit)}>
            <label>
              Email address
            </label><br />
            <input {...register("usermail" , {
              required:{
                value : true,
                message : "This field is required"
              }
            })} className='ring-1 w-full py-2 px-3 rounded-md mb-1 mt-2 outline-none' type="email" placeholder='hello@example.com'/>
            {errors.usermail ? <p className='text-red-600 text-xs' >{errors.usermail.message}</p> : <p className='text-xs'></p>}
            <br />
            <label>Password</label>
            <br />
            <input {...register("userpass" , {
              required:{
                value : true,
                message : "Enter the password"
              }
            })} className='ring-1 w-full py-2 px-3 rounded-md mb-1 mt-2 outline-none' type="password" placeholder='*********' />
            {errors.userpass ? <p className='text-red-600 text-xs' >{errors.userpass.message}</p > : <p className='text-xs'></p>}
            <br />
            <button className='bg-blue-900 w-full py-2 rounded-md mt-5 text-white' >Log In</button>
          </form>
        </div>
      </div>


      <div className='h-full relative flex justify-center '>
        <img className='w-full h-full object-contain'  src={loginBg} alt="" />
        <div className='login-bio absolute bottom-20 px-4 py-2 rounded-md bg-red-500 w-[75%]'>
            <header className='text-black text-sm bg-green-400 px-3 py-1 rounded-md capitalize w-fit my-4'>👍 top notch education resources</header>
            <p className='font-extralight' >Today, we create innovative solutions to the challenges that consumers face in both their everyday lives and events.</p>
        </div>
      </div>

      <ToastContainer/>
    </div>
  )
}

export default Login
