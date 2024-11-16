import React , {useEffect , useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getMentors, getStudents } from '../../../../../redux/slice/UserSlice'
import { FaGraduationCap } from "react-icons/fa";
import Loader from '../../../../../utils/Loaders/Loader';
import { admin_stats } from '../../../../../utils/utils';

const AdminStats = () => {


    const studentData = useSelector((state) => state.users.students)
    const mentorData = useSelector((state) => state.users.mentors)
    const dispatch = useDispatch()

    const handleStats = (item) =>{
      if(item === 'students'){
        return studentData?.length;
      } else if(item === 'mentors'){
        return mentorData?.length;
      } else if(item === 'events'){
        return null
      } else {
        return null
      }
    }

    useEffect(()=>{
        dispatch(getStudents())
        dispatch(getMentors())
    },[dispatch])

  return (
    <div className='grid grid-cols-4 my-2 mx-4 gap-4' >

    {admin_stats?.map((Element , id) =>(
            <div key={id} className='bg-white rounded-md px-3 py-1 my-4 h-[8rem] relative' >
            <header className='w-full'>
              <p className={`absolute top-[-1rem] text-2xl ${Element.bgColor} w-fit text-white p-3 rounded-md`} >{<Element.icon/>}</p>
              <p className='text-right capitalize font-semibold opacity-70' >{Element.item}</p>
            </header>
            <main>
              <p className={`text-6xl text-right mt-3`} >
              {(handleStats(Element.item) === 0) ? <Loader/> : handleStats(Element.item)}
              </p>
            </main>
          </div>
    ))}
    </div>
  )
}

export default AdminStats
