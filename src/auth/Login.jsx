import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import loginBg from './assets/loginBG.svg';
import google from './assets/google.svg';
import facebook from './assets/facebook.svg';
import { getStudents, getMentors } from '../redux/slice/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const students = useSelector((state) => state.users.students);
  const mentors = useSelector((state) => state.users.mentors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin_mail = import.meta.env.VITE_ADMIN_MAIL;
  const admin_pass = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getMentors());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      toast.loading('Logging...', { theme: 'dark' });

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Check admin credentials
          if (data.usermail === admin_mail && data.userpass === admin_pass) {
            localStorage.setItem(
              'adminCredentials',
              JSON.stringify({
                mail: data.usermail,
                role: 'admin',
              })
            );
            navigate('/admin/dashboard');
            resolve();
          } else {
            // Check mentor credentials
            const mentor = mentors.find(
              (mentor) =>
                mentor.Email === data.usermail && mentor.Password === data.userpass
            );

            if (mentor) {
              localStorage.setItem(
                'mentorCredentials',
                JSON.stringify({
                  mail: data.usermail,
                  role: 'mentor',
                })
              );
              navigate('/mentor/dashboard');
              resolve();
            } else {
              // Check student credentials
              const student = students.find(
                (student) =>
                  student.Email === data.usermail && student.Password === data.userpass
              );

              if (student) {
                localStorage.setItem(
                  'studentCredentials',
                  JSON.stringify({
                    mail: data.usermail,
                    role: 'student',
                  })
                );
                navigate('/student/dashboard');
                resolve();
              } else {
                reject(new Error('Invalid credentials'));
              }
            }
          }
        }, 2000);
      });

      toast.dismiss();
      toast.success('Logged in successfully', { theme: 'dark' });
    } catch (error) {
      toast.dismiss();
      toast.error('Invalid credentials', { theme: 'dark' });
    }
  };

  return (
    <div className='flex justify-between h-screen'>
      <div className='h-full flex items-center justify-center flex-1'>
        <div className='w-[25vw]'>
          <h1 className='font-semibold text-3xl text-center'>Welcome back</h1>
          <p className='text-md text-center opacity-70'>Login to your account</p>

          {/* Social media section */}
          <div className='flex justify-center w-full gap-12 my-6'>
            <img className='w-10 cursor-pointer shadow-xl rounded-full' src={google} alt='' />
            <img className='w-10 cursor-pointer shadow-xl rounded-full' src={facebook} alt='' />
          </div>

          {/* Horizontal line */}
          <div className='flex justify-between items-center gap-3'>
            <div className='border border-black w-full h-0 opacity-30'></div>
            <p>or</p>
            <div className='border border-black w-full opacity-30'></div>
          </div>

          {/* Form section */}
          <form className='my-5' onSubmit={handleSubmit(onSubmit)}>
            <label>Email address</label>
            <br />
            <input
              {...register('usermail', {
                required: { value: true, message: 'This field is required' },
              })}
              className='ring-1 w-full py-2 px-3 rounded-md mb-1 mt-2 outline-none'
              type='email'
              placeholder='hello@example.com'
            />
            {errors.usermail && <p className='text-red-600 text-xs'>{errors.usermail.message}</p>}
            <br />
            <label>Password</label>
            <br />
            <input
              {...register('userpass', {
                required: { value: true, message: 'Enter the password' },
              })}
              className='ring-1 w-full py-2 px-3 rounded-md mb-1 mt-2 outline-none'
              type='password'
              placeholder='*********'
            />
            {errors.userpass && <p className='text-red-600 text-xs'>{errors.userpass.message}</p>}
            <br />
            <button className='bg-blue-900 w-full py-2 rounded-md mt-5 text-white'>Log In</button>
          </form>
        </div>
      </div>

      {/* Background Section */}
      <div className='h-full relative flex justify-center'>
        <img className='w-full h-full object-contain' src={loginBg} alt='' />
        <div className='login-bio absolute bottom-20 px-4 py-2 rounded-md bg-red-500 w-[75%]'>
          <header className='text-black text-sm bg-green-400 px-3 py-1 rounded-md capitalize w-fit my-4'>
            👍 Top notch education resources
          </header>
          <p className='font-extralight'>
            Today, we create innovative solutions to the challenges that consumers face in both
            their everyday lives and events.
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
