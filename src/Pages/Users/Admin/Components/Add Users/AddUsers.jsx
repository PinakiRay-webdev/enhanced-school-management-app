import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddForm } from "../../../../../redux/slice/AddFormSlice";
import { useForm } from "react-hook-form";
import {
  CreateMentor,
  createStudent,
} from "../../../../../redux/slice/UserSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUsers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const dispatch = useDispatch();

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    const newStudent = {
      FirstName: data.firstname,
      LastName: data.lastname,
      Email: data.mail,
      Password: data.pass,
      Role: data.role,
      Course: data.course,
      DOB : "",
      Gender : "",
      Phone : "",
      Adress : "",
      City : "",
      State : "",
      PinCode : ""
    };

    const newMentor = {
      FirstName: data.firstname,
      LastName: data.lastname,
      Email: data.mail,
      Password: data.pass,
      Role: data.role,
      Department: data.department,
      DOB : "",
      Gender : "",
      Phone : "",
      Adress : "",
      City : "",
      State : "",
      PinCode : ""
    };

    toast.loading("adding...", { theme: "dark", position: "top-center" });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      toast.dismiss();
      toast.success("user added successfully", {
        theme: "dark",
        position: "top-center",
      });
      selectedRole === "student"
        ? dispatch(createStudent(newStudent))
        : dispatch(CreateMentor(newMentor));
      reset();
      dispatch(toggleAddForm());
    });
  };

  const formState = useSelector((state) => state.addForm.isAddFormOpen);

  return (
    <div
      className={`absolute w-[28%] h-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-3 py-4 transition-all ease-in-out duration-150 ${
        formState ? "scale-100" : "scale-0"
      } `}
    >
      <header className="flex justify-between items-center">
        <h1>Add a user</h1>
        <p
          onClick={() => dispatch(toggleAddForm())}
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
        <div>
          <label>Password</label>
          <br />
          <input
            {...register("pass", {
              required: {
                value: true,
                message: "this field is required",
              },
            })}
            className="w-full ring-1 ring-green-500 py-1 px-2 rounded-md outline-none mt-2"
            type="password"
            placeholder="*******"
          />
          {errors.pass && (
            <p className="text-red-500 font-semibold mt-2 text-xs">
              {errors.pass.message}
            </p>
          )}
        </div>

        <div>
          <label>Role</label>
          <br />
          <select
            {...register("role", {
              required: {
                value: true,
                message: "this field is required",
              },
            })}
            className="w-full ring-1 ring-green-500 py-2 px-2 rounded-md outline-none mt-2"
          >
            <option value="">Select a role</option>{" "}
            {/* Add an empty option for default */}
            <option value="mentor">Mentor</option>
            <option value="student">Student</option>
          </select>
          {errors.role && (
            <p className="text-xs text-red-500 font-semibold mt-2">
              {errors.role.message}
            </p>
          )}
        </div>

        {selectedRole === "mentor" && (
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

{selectedRole === "student" && (
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

        <button className="bg-green-700 absolute bottom-2 px-4 py-1 text-white rounded-md right-4">
          Add user
        </button>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddUsers;
