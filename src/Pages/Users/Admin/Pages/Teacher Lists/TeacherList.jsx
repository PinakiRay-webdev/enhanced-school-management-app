import React , {useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getMentors} from '../../../../../redux/slice/UserSlice'
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiDotsThreeCircleLight } from "react-icons/pi";

const TeacherList = () => {


  const teacherData = useSelector((state) => state.users.mentors)
  const dispatch = useDispatch()
  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  useEffect(()=>{
    dispatch(getMentors())
  },[dispatch])

  return (
    <div className={`${sidebarStatus ? "ml-[11vw]" : "ml-[6vw]"}  my-2 mr-[1vw]`} >

      {/* header of the table  */}
      <header className='grid grid-cols-6 px-6 py-3 mt-6 bg-green-100' >
        <p className='capitalize text-green-800 font-semibold border' >Mentor ID</p>
        <p className='capitalize text-green-800 font-semibold' >Name</p>
        <p className='capitalize text-green-800 font-semibold' >Email</p>
        <p className='capitalize text-green-800 font-semibold' >Course</p>
        <p className='capitalize text-green-800 font-semibold' >City</p>
        <p className='capitalize text-green-800 font-semibold' >Actions</p>
      </header>

    {/* table data  */}

      <main className='px-5' >
        {teacherData?.map((Element , id)=>(
          <div className='py-2 grid grid-cols-6' key={id} >
            <div>
              <p>{"# ID "+Element.id}</p>
            </div>
            {/* name of the students  */}
            <div className='flex gap-2' >
            <p className='capitalize' >{Element.FirstName}</p>
            <p>{Element.LastName}</p>
            </div>

            {/* email of the students  */}
            <div>
              <p className='' >{Element.Email}</p>
            </div>

            <div>
              <p>{(Element.Course ? Element.Course : "N/A" )}</p>
            </div>

            <div>
              <p>{(Element.City ? Element.City : "N/A" )}</p>
            </div>

            
            <div className='flex items-center gap-4' >
              <p className='text-xl text-orange-500 cursor-pointer' ><FaUserEdit/></p>
              <p className='text-xl text-red-600 cursor-pointer' ><MdDelete/></p>
              <p className='text-xl text-lime-800 cursor-pointer' ><PiDotsThreeCircleLight/></p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default TeacherList
