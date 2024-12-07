import React from 'react'
import { useForm } from 'react-hook-form'
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import { ToastContainer , toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AssignMarks = ({marksBox , setMarksBox , studentID}) => {

    const {
        register,
        handleSubmit,
        formState : {errors , isSubmitting},
        setValue,
        reset
    } = useForm()

    const onSubmit = async (data) =>{
        toast.loading('submitting marks...' , {theme : 'dark'})
        await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve()
            },1500)
        }).then(()=>{
            toast.dismiss()
            toast.success('marks assigned successfully' , {theme : 'dark'})
        })
    }

    const selectedStudent = useSelector((state) => state.users.students.find((e) => e.id === studentID))

    setValue('term' , "")
    setValue('firstname' , selectedStudent?.FirstName )
    setValue('lastname' , selectedStudent?.LastName )

    const closeForm = () =>{
        setMarksBox('scale-0')
    }

  return (
    <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-4 py-6 rounded-md drop-shadow-lg ${marksBox} transition-all duration-150 ease-in-out `} >
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-2' >

        {/* first and last name  */}
            <div>
            <label className='text-sm font-semibold text-green-700' >First name</label>
            <br />
            <input {...register('firstname' , {
                required : {
                    value : true,
                    message : 'this is required'
                }
            } )} type="text" className='ring-1 ring-green-700 py-1 px-3 rounded-md my-2 outline-none' />
            {errors.firstname && <p className='text-xs font-semibold text-red-600' >{errors.firstname.message}</p>}
            </div>

            <div>
            <label className='text-sm font-semibold text-green-700' >Last name</label>
            <br />
            <input {...register('lastname' , {
                required : {
                    value : true,
                    message : 'this is required'
                }
            })} type="text" className='ring-1 ring-green-700 py-1 px-3 rounded-md my-2 outline-none'/>
            {errors.lastname && <p className='text-xs font-semibold text-red-600' >{errors.lastname.message}</p>}
            </div>

        <div>
            <label className='text-sm font-semibold text-green-700' >Term</label>
            <br />
            <select {...register('term' , {
                required : {
                    value : true,
                    message : 'select the term'
                }
            })} className='w-full ring-1 ring-green-700 py-2 px-3 rounded-md my-2 outline-none ' >
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
                <option>Term 4</option>
                <option>Term 5</option>
            </select>
            {errors.term && <p className='text-xs font-semibold text-red-600' >{errors.term.message}</p>}
        </div>

        <div>
            <label className='text-sm font-semibold text-green-700' >Marks</label>
            <br />
            <input {...register('mark' , {
                required : {
                    value : true,
                    message : 'assign the mark'
                }
            })} type="number" className='ring-1 ring-green-700 py-1 px-3 rounded-md my-2 outline-none' />
            {errors.mark && <p className='text-xs font-semibold text-red-600' >{errors.mark.message}</p>}
        </div>
        <button type='submit' className='bg-black text-white py-2 mt-6' >Assign</button>
        <button type='button' onClick={closeForm} className='bg-red-500 text-white py-2 mt-6' >Close</button>
      </form>
      {/* <ToastContainer/> */}
    </div>
  )
}

export default AssignMarks
