import React , {useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getStudents } from '../../../../../redux/slice/UserSlice'
const StudentList = () => {


  const studentData = useSelector((state) => state.users.students)
  const dispatch = useDispatch()
  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  useEffect(()=>{
    dispatch(getStudents())
  },[dispatch])

  return (
    <div className={`${sidebarStatus ? "ml-[11vw]" : "ml-[6vw]"}  my-2 mr-[1vw]`} >
      <header className='grid grid-cols-5 py-3 px-5 mt-6 bg-green-100' >
        <p className='capitalize text-green-800 font-semibold' >name</p>
        <p className='capitalize text-green-800 font-semibold' >Email</p>
      </header>
      <main className='px-5' >
        {studentData?.map((Element , id)=>(
          <div className='py-2 grid grid-cols-5' key={id} >
            {/* name of the students  */}
            <div className='flex gap-2' >
            <p className='capitalize' >{Element.FirstName}</p>
            <p>{Element.LastName}</p>
            </div>

            {/* email of the students  */}
            <div>
              <p>{Element.Email}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default StudentList
