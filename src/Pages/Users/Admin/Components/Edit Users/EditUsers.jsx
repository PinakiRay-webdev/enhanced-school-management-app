import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddForm } from "../../../../../redux/slice/AddFormSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editMentor, editStudent, getStudents,} from "../../../../../redux/slice/UserSlice";

const EditUsers = ({editBoxStatus , setEditBoxStatus , studentID , mentorID}) => {

    const SelectedStudent = useSelector((state) => state.users.students.find((e) => e.id === studentID))
    const SelectedMentor = useSelector((state) => state.users.mentors.find((e) => e.id === mentorID))
    const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  
  useEffect(() =>{
    if(SelectedStudent){
        setValue("firstname" , SelectedStudent.FirstName)
        setValue("lastname" , SelectedStudent.LastName)
        setValue("mail" , SelectedStudent.Email)
        setValue("course" , SelectedStudent.Course)
    }else{
        setValue("firstname" , SelectedMentor?.FirstName)
        setValue("lastname" , SelectedMentor?.LastName)
        setValue("mail" , SelectedMentor?.Email)
        setValue("department" , SelectedMentor?.Department)
    }
  },[SelectedStudent , setValue , SelectedMentor])


  const closeEditBox = () =>{
    setEditBoxStatus("scale-0")
  }

  const onSubmit = async (data) => {
    const updatedStudent = {
        id : studentID,
        FirstName : data.firstname,
        LastName : data.lastname,
        Email : data.mail,
        Course : data.course
    }

    const updatedMentor = {
      id : mentorID,
      FirstName : data.firstname,
      LastName : data.lastname,
      Email : data.mail,
      Department : data.department
  }
    toast.loading('Applying changes' , {
        theme : 'dark'
    })
    await new Promise((resolve) =>{
        setTimeout(() => {
            resolve()
        }, 1500);
    }).then(()=>{
        toast.dismiss()
        SelectedStudent ? dispatch(editStudent(updatedStudent)) : dispatch(editMentor(updatedMentor))
        toast.success('Sucessfully updated!!' , {
            theme : 'dark'
        });
        reset()
        closeEditBox()
    })
  };


  return (
    <div
      className={`${editBoxStatus} absolute w-[28%] h-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-3 py-4 transition-all ease-in-out duration-150`}
    >
      <header className="flex justify-between items-center">
        <h1>Edit a user</h1>
        <p
        onClick={closeEditBox}
          className="text-red-500 text-xl cursor-pointer"
        >
          <IoIosCloseCircle />
        </p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 py-6 gap-3 border-t my-3"
      >
        <div>
          <label>First Name</label>
          <br />
          <input
            {...register("firstname", {
              required: {
                value: true,
                message: "this field is required",
              },
            })}
            className="w-full ring-1 ring-green-500 py-1 px-2 rounded-md outline-none mt-2"
            type="text"
            placeholder="Jon"
          />
          {errors.firstname && (
            <p className="text-xs mt-2 text-red-500 font-semibold">
              {errors.firstname.message}
            </p>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <br />
          <input
            {...register("lastname", {
              required: {
                value: true,
                message: "this field is required",
              },
            })}
            className="w-full ring-1 ring-green-500 py-1 px-2 rounded-md outline-none mt-2"
            type="text"
            placeholder="Snow"
          />
          {errors.lastname && (
            <p className="text-xs text-red-500 font-semibold mt-2">
              {errors.lastname.message}
            </p>
          )}
        </div>
        <div>
          <label>Email id</label>
          <br />
          <input
            {...register("mail", {
              required: {
                value: true,
                message: "this field is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid mail",
              },
            })}
            className="w-full ring-1 ring-green-500 py-1 px-2 rounded-md outline-none mt-2"
            type="text"
            placeholder="hello@example.com"
          />
          {errors.mail && (
            <p className="text-xs font-semibold mt-2 text-red-500">
              {errors.mail.message}
            </p>
          )}
        </div>
        
      {SelectedStudent && (
                <div>
                <label>Course</label>
                <br />
                <input
                  {...register("course", {
                    required: {
                      value: true,
                      message: "this field is required",
                    },
                  })}
                  className="w-full ring-1 ring-green-500 py-1 px-2 rounded-md outline-none mt-2"
                  type="text"
                  placeholder="example"
                />
                {errors.course && (
                  <p className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.course.message}
                  </p>
                )}
              </div>
      )}

      {SelectedMentor && (
                <div>
                <label>Department</label>
                <br />
                <input
                  {...register("department", {
                    required: {
                      value: true,
                      message: "this field is required",
                    },
                  })}
                  className="w-full ring-1 ring-green-500 py-1 px-2 rounded-md outline-none mt-2"
                  type="text"
                  placeholder="example"
                />
                {errors.department && (
                  <p className="text-red-500 font-semibold mt-2 text-xs">
                    {errors.department.message}
                  </p>
                )}
              </div>
      )}

        <button className="bg-green-700 absolute bottom-2 px-4 py-1 text-white rounded-md right-4">
          Edit user
        </button>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditUsers;
