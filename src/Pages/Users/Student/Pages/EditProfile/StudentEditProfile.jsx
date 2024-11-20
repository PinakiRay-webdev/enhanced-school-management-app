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
      LastName: data.lastname,
      Email: data.mail,
      Gender: data.gender,
      Phone: data.phone,
      Address : data.address,
      City : data.city,
      State : data.state,
      Country : data.country,
      PinCode : data.pincode
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
      setValue("phone", currentStudent.Phone ? currentStudent.Phone : "");
      setValue("address", currentStudent.Address ? currentStudent.Address : "");
      setValue("city", currentStudent.City ? currentStudent.City : "");
      setValue("state", currentStudent.State ? currentStudent.State : "");
      setValue("country", currentStudent.Country ? currentStudent.Country : "");
      setValue("pincode", currentStudent.PinCode ? currentStudent.PinCode : "");


    }
  }, [currentStudent]);

  return (
    <div className={`pl-[5vw]`}>
      <div className="px-3 py-4 h-[92vh] grid grid-cols-3 gap-3">
        {/* edit form  */}
        <div className="col-span-2 h-full" >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white relative px-6 py-4 h-full rounded-md"
          >
            <h1 className="font-medium text-xl">General Information</h1>
            {/* general information  */}
            <div className="grid grid-cols-2 mt-4 gap-6">
              <div>
                <label className="text-sm font-medium opacity-80">
                  First Name
                </label>{" "}
                <br />
                <input
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "This feild is required",
                    },
                  })}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2 w-full"
                  type="text"
                />
                {errors.firstname && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium opacity-80">
                  Last Name
                </label>{" "}
                <br />
                <input
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "This feild is required",
                    },
                  })}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2 w-full"
                  type="text"
                />
                {errors.lastname && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium opacity-80">
                  Email Address
                </label>{" "}
                <br />
                <input
                  {...register("mail", {
                    required: {
                      value: true,
                      message: "This feild is required",
                    },
                  })}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2 w-full"
                  type="text"
                />
                {errors.mail && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.mail.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium opacity-80">Gender</label>{" "}
                <br />
                <input
                  {...register("gender")}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2 w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="text-sm font-medium opacity-80">
                  Phone No.
                </label>{" "}
                <br />
                <input
                  {...register("phone")}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md my-2"
                  type="text"
                />
              </div>
            </div>

            {/* address information  */}
            <h1 className="font-medium text-xl mt-6 mb-4">Address</h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="text-sm font-medium opacity-80">
                  Address / House
                </label>{" "}
                <br />
                <input
                {...register('address')}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md w-full"
                  type="text"
                  placeholder="Enter your address"
                />
              </div>

              <div className="col-span-1">
                <label className="text-sm font-medium opacity-80">
                  City
                </label>{" "}
                <br />
                <input
                {...register('city')}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md w-full"
                  type="text"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="text-sm font-medium opacity-80">State</label>{" "}
                <br />
                <input
                {...register('state')}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md w-full"
                  type="text"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="text-sm font-medium opacity-80">Country</label>{" "}
                <br />
                <input
                {...register('country')}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md w-full"
                  type="text"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="text-sm font-medium opacity-80">
                  Pincode
                </label>{" "}
                <br />
                <input
                {...register('pincode')}
                  className="ring-2 ring-lime-500 outline-none py-1 px-2 rounded-md w-full"
                  type="text"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <button className="absolute bottom-2 bg-black text-white px-4 py-1 rounded-md">
              Save changes
            </button>
          </form>
        </div>
          
          {/* user card  */}
        <div className="bg-white rounded-md" >
          {/* background image  */}
            <div className="bg-green-100 h-[40%] relative" >
              {/* profile image  */}
              <div className="bg-green-700 rounded-full w-[7rem] h-[7rem] absolute bottom-[-3rem] left-[50%] translate-x-[-50%]" >
              </div>
            </div>

            <div className="mt-[4rem]" >
              <h1 className="text-center capitalize font-semibold text-lg" >{currentStudent?.FirstName} {currentStudent?.LastName}</h1>
              <p className="text-center capitalize" >{currentStudent?.Course} Student</p>
              <p></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEditProfile;
