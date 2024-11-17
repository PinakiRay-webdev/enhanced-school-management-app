import React from 'react'
import { deleteMentor, deleteStudent } from '../../redux/slice/UserSlice'
import { useSelector , useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteConfirmation = ({deleteBoxStatus , setDeleteBoxStatus , studentID , mentorID}) => {

    const studentData = useSelector((state) => state.users.students)
    const mentorData = useSelector((state) => state.users.mentors)
    const dispatch = useDispatch()

    const currentStudent = studentData?.find((e) => e.id === studentID)
    const currentMentor = mentorData?.find((e) => e.id === mentorID)

    const selectedUser = currentMentor || currentStudent

    const closeDeleteBox = () =>{
        setDeleteBoxStatus("scale-0")
    }

    const delay = () =>{
        return new Promise((resolve) =>{
            setTimeout(() => {
                resolve()
            }, 1500);
        })
    }

    const deleteUser = () =>{
        toast.promise(delay , {
            pending : 'deleting',
            success : 'user deleted successfully',
            error : 'unable to process the action!!'
        } , {
            theme : 'dark'
        }).then(()=>{
            selectedUser === currentStudent ? dispatch(deleteStudent(studentID)) : dispatch(deleteMentor(mentorID))
            closeDeleteBox()
        })
    }
    

  return (
    <div className={` ${deleteBoxStatus} absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[20vw] px-5 py-3 rounded-md shadow-md transition-all duration-150 ease-in-out`}>
      <p>Are you sure want to remove <span>{currentStudent?.FirstName || currentMentor?.FirstName} {currentStudent?.LastName || currentMentor?.LastName}</span> ?</p>
      <div className='mt-10 flex gap-4' >
        <button onClick={deleteUser} className='bg-red-500 px-3 py-1 rounded-md text-white' >Delete</button>
        <button onClick={closeDeleteBox} className='px-3 py-1 rounded-md text-red-500 border border-red-500 hover:border-red-700 hover:text-red-700 transition-all duration-150 ease-in-out' >Cancel</button>
      </div>
    </div>
  )
}

export default DeleteConfirmation
