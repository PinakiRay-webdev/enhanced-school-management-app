import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMentors, getStudents } from "../../redux/slice/UserSlice";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const userID = params.id;

  const currentStudent = useSelector((state) =>
    state.users.students.find((e) => e.id === userID)
  );
  const currentMentor = useSelector((state) =>
    state.users.mentors.find((e) => e.id === userID)
  );

  const navigate = useNavigate()

  const openEditProfile = (studentID) =>{
    navigate(`/student/profile/edit/${studentID}`)
  }

  const currentUser = currentStudent || currentMentor;

  const userRole =
    JSON.parse(localStorage.getItem("adminCredentials")) ||
    JSON.parse(localStorage.getItem("studentCredentials")) || 
    JSON.parse(localStorage.getItem('mentorCredentials'))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getMentors());
  }, [dispatch]);

  return (
    <div className={`${currentMentor ? "grid grid-cols-4" : ""} gap-3 p-2`}>
      <div className="ml-[5vw] bg-white rounded-lg h-[60vh] col-span-3">
          {/* background picture  */}
        <div className="relative bg-green-100 h-[30vh] rounded-t-md">
          {/* button to edit the user profile  */}
          {userRole.role === 'student' && (
            <button onClick={() => openEditProfile(currentStudent?.id)} className="absolute right-10 top-4 bg-black text-white px-4 py-2 rounded-md text-xs">
              Edit Profile
            </button>
          )}

          {/* profile picture  */}
          <div className="bg-green-400 rounded-full w-[12rem] h-[12rem] absolute bottom-[-6rem] left-[3rem] ring-4 ring-green-700"></div>
        </div>

        {/* user details  */}
        <div className="ml-[18rem] flex justify-between">

            {/* left side  */}
          <div>
            <h1 className="text-5xl capitalize">
              {currentUser?.FirstName} {currentUser?.LastName}
            </h1>
            {currentMentor && (
              <p>
                Licence Number :{" "}
                {currentUser?.Licence ? (
                  currentUser?.Licence
                ) : (
                  <span className="text-sm font-semibold opacity-60">
                    Not Verified
                  </span>
                )}
              </p>
            )}

            {/* user address  */}
            <p className="flex items-center gap-1 mt-2">
              <span>
                <CiLocationOn />
              </span>
              {currentStudent?.City ? currentStudent?.City : ""}
            </p>

            {/* user personal details  */}
            <div className="flex items-center gap-3 mt-2" >

            {currentUser?.DOB !== '' ? <p>{currentUser?.DOB}</p> : ""}
            {currentUser?.Gender !== '' ? <p>{currentUser?.Gender}</p> : ""}
            </div>

            {/* position of the user  */}
            {currentStudent && (
              <p className="my-2 font-medium opacity-80">
                Student in {currentStudent?.Course} course
              </p>
            )}

            {/* additional button only for admin  */}
            {userRole.role === "admin" && (
              <div className="flex gap-4 mt-5">

                <button className="bg-green-800 text-white px-4 py-1 text-sm rounded-md">
                  Invite to a project
                </button>
                <button className="border border-green-800 text-black px-4 py-2 text-sm rounded-md">
                  Message
                </button>
              </div>
            )}
          </div>

            {/* right side  */}
          <div className="w-[30%]">
            <header className="text-xl">Contact</header>
            <div className="flex gap-3 flex-wrap">
              <p className="bg-zinc-100 w-fit px-3 py-1 text-sm rounded-md mt-2 flex items-center gap-1">
                <CiMail /> {currentUser?.Email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`p-4 bg-white ${
          currentMentor ? "block" : "hidden"
        } rounded-md`}
      ></div>
    </div>
  );
};

export default Profile;
