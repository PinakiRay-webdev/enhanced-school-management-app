import React , {useState , useEffect , useCallback} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getStudents } from '../../../../../redux/slice/UserSlice'
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiInfo } from "react-icons/pi";
import DeleteConfirmation from '../../../../../utils/DeleteConfirmationBox/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import EditUsers from '../../Components/Edit Users/EditUsers';

const StudentList = () => {

  const [deleteBoxStatus , setDeleteBoxStatus] = useState("scale-0")
  const [studentID, setStudentID] = useState("")
  const [editBoxStatus, setEditBoxStatus] = useState("scale-0")

  const studentData = useSelector((state) => state.users.students)
  const dispatch = useDispatch()
  const sidebarStatus = useSelector((state) => state.sidebar.isOpen)

  const userRole =
  JSON.parse(localStorage.getItem("adminCredentials")) ||
  JSON.parse(localStorage.getItem('mentorCredentials'))

  const getStudentData = useCallback(()=>{
    dispatch(getStudents())
  },[dispatch])

  useEffect(()=>{
    getStudentData()
  },[getStudentData])



  const openDeleteBox = (studentID) =>{
    setStudentID(studentID)
    setDeleteBoxStatus("scale-100")
  }

  const openEditBox = (studentID) =>{
    setStudentID(studentID)
    setEditBoxStatus("scale-100")
  }

  const navigate = useNavigate()

  const openProfile = (userID) =>{
    navigate(`/${userRole.role}/student/profile/${userID}`)
  }

  return (
    <div className={`${sidebarStatus ? "ml-[11vw]" : "ml-[6vw]"}  my-2 mr-[1vw]`} >

      {/* header of the table  */}
      <header className='grid grid-cols-6 px-6 py-3 mt-6 bg-green-100' >
        <p className='capitalize text-green-800 font-semibold border' >Student ID</p>
        <p className='capitalize text-green-800 font-semibold' >Name</p>
        <p className='capitalize text-green-800 font-semibold' >Email</p>
        <p className='capitalize text-green-800 font-semibold' >Course</p>
        <p className='capitalize text-green-800 font-semibold' >City</p>
        <p className='capitalize text-green-800 font-semibold' >Actions</p>
      </header>

    {/* table data  */}

      <main className='px-5' >
        {studentData?.map((Element , id)=>(
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

            {/* actions  */}
            {userRole.role === 'admin' ? (
              
            <div className='flex items-center gap-4' >
              <p onClick={() => openEditBox(Element.id)} className='text-xl text-orange-500 cursor-pointer' ><FaUserEdit/></p>
              <p onClick={() => openDeleteBox(Element.id)} className='text-xl text-red-600 cursor-pointer' ><MdDelete/></p>
              <p onClick={() => openProfile(Element.id)} className='text-xl text-lime-800 cursor-pointer' ><PiInfo/></p>
            </div>
            ) : (
              <p onClick={() => openProfile(Element.id)} className='text-xl text-lime-800 cursor-pointer' ><PiInfo/></p>
            ) }
          </div>
        ))}
      </main>

      <DeleteConfirmation deleteBoxStatus = {deleteBoxStatus} setDeleteBoxStatus = {setDeleteBoxStatus} studentID = {studentID} />
      <EditUsers editBoxStatus={editBoxStatus} setEditBoxStatus={setEditBoxStatus} studentID = {studentID} />
    </div>
  )
}

export default StudentList
