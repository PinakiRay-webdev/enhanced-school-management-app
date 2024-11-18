import React , {useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getMentors, getStudents } from '../../redux/slice/UserSlice';
import { CiLocationOn } from "react-icons/ci";

const Profile = () => {

    const params = useParams();
    const userID = params.id

    const currentStudent = useSelector((state) => state.users.students.find((e) => e.id === userID))
    const currentMentor = useSelector((state) => state.users.mentors.find((e) => e.id === userID))

    const currentUser = currentStudent || currentMentor

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getStudents())
        dispatch(getMentors())
    } , [dispatch])



  return (
    <div className={`${currentMentor ? "grid grid-cols-4" : ""} gap-3 p-2`} >
    <div className='ml-[5vw] bg-white rounded-lg h-[52vh] col-span-3' >
        <div className='relative bg-green-100 h-[30vh] rounded-t-md' >
            <div className='bg-green-400 rounded-full w-[12rem] h-[12rem] absolute bottom-[-6rem] left-[3rem] ring-4 ring-green-700' >
                
            </div>
        </div>
        <div className='ml-[18rem]' >
            <h1 className='text-5xl capitalize' >{currentUser?.FirstName} {currentUser?.LastName}</h1>
            {currentMentor && (<p>Licence Number : {currentUser?.Licence ? currentUser?.Licence : <span className='text-sm font-semibold opacity-60' >Not Verified</span>}</p>)}
        <p className='flex items-center gap-1 mt-2' ><span><CiLocationOn/></span>{currentStudent?.City ? currentStudent?.City : ""}</p>
        </div>
    </div>

    <div className={`p-4 bg-white ${currentMentor ? "block" : "hidden"} rounded-md`} >
        
    </div>
    </div>
  )
}

export default Profile
