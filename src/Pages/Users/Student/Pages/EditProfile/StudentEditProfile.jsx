import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editStudent } from "../../../../../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentEditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();
  const studentID = params.id;

  const currentStudent = useSelector((state) =>
    state.users.students.find((e) => e.id === studentID)
  );
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    toast.loading("Saving changes...", { theme: "dark" });
    const updatedStudent = {
      id: studentID,
      FirstName: data.firstname,
    };

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      toast.dismiss();
      dispatch(editStudent(updatedStudent));
      toast.success("Changes applied successfully", { theme: "dark" });
      navigate(`/student/profile/${studentID}`);
    });
  };

  useEffect(() => {
    if (currentStudent) {
      setValue("firstname", currentStudent.FirstName);
      setValue("lastname", currentStudent.LastName);
      setValue("mail", currentStudent.Email);
      setValue("gender", currentStudent.Gender ? currentStudent.Gender : "");
      setValue("phone", currentStudent.Phone ? currentStudent.phone : "");
    }
  }, [currentStudent]);

  return (
    <div className={`pl-[5vw]`}>
      <div className="px-3 py-4 h-[90vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white h-full relative px-6 py-4">
          <h1 className="font-medium text-xl">General Information</h1>
          {/* general information  */}
          <div className="grid grid-cols-2 mt-4" >
            <div>
              <label className="text-sm font-medium" >First Name</label> <br />
              <input
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "This feild is required",
                  },
                })}
                className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2"
                type="text"
              />
              {errors.firstname && (
                <p className="text-xs text-red-600 font-semibold">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium" >Last Name</label> <br />
              <input
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "This feild is required",
                  },
                })}
                className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2"
                type="text"
              />
              {errors.lastname && (
                <p className="text-xs text-red-600 font-semibold">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          <div>
          <label className="text-sm font-medium" >Email Address</label> <br />
          <input {...register('mail' , {
            required:{
              value : true,
              message : 'This feild is required'
            }
          })} className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2" type="text" />
          {errors.mail && <p className='text-xs text-red-600 font-semibold' >{errors.mail.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium" >Gender</label> <br />
          <input {...register('gender' , {
            required:{
              value : true,
              message : 'This feild is required'
            }
          })} className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2" type="text" />
          {errors.Gender && <p className='text-xs text-red-600 font-semibold' >{errors.Gender.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium" >Phone No.</label> <br />
          <input {...register('phone' , {
            required:{
              value : true,
              message : 'This feild is required'
            }
          })} className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2" type="text" />
          {errors.phone && <p className='text-xs text-red-600 font-semibold' >{errors.phone.message}</p>}
        </div>
          </div>



          <button className="absolute bottom-5 bg-black text-white px-4 py-1 rounded-md">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentEditProfile;
