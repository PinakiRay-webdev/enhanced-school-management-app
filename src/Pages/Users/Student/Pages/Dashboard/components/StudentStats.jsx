import React, { useState, useEffect } from "react";
import { db } from "../../../../../../utils/firebase/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { GoChecklist } from "react-icons/go";
import { MdTipsAndUpdates } from "react-icons/md";

import { getStudents } from "../../../../../../redux/slice/UserSlice";

const StudentStats = () => {
  const dispatch = useDispatch();

  const selectedStudent = useSelector((state) =>
    state.users.students.find(
      (e) =>
        e.Email ===
        JSON.parse(localStorage.getItem("studentCredentials") || "{}").mail
    )
  );

  const [totalMarks, setTotalMarks] = useState(0);
  const [studentID, setStudentID] = useState("");
  const [textmarks, setTextmarks] = useState([])

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStudent) {
      setStudentID(selectedStudent.id);
    }
  }, [selectedStudent]);

  useEffect(() => {
    const getAvgMarks = async () => {
      if (!studentID) return;

      try {
        const studentRef = doc(db, "student marks", studentID);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const marks = studentSnap.data().terms || [];
          setTextmarks(marks)
          const sum = marks.reduce((acc, term) => acc + parseInt(term.mark) , 0);
          const average = marks.length > 0 ? Math.round(sum / marks.length) : 0;
          setTotalMarks(average);
        
        }
      } catch (error) {
        console.error("Error fetching student marks:", error);
      }
    };

    getAvgMarks();
  }, [studentID]);


  
  return (
    <div className="w-full h-fit col-span-4 row-span-1">
      <div className="px-3 py-2">
        <div className="flex gap-5" >
          <div className="bg-white w-full h-[8rem] rounded-md shadow-lg relative">
            <p className="text-2xl p-2 rounded-md bg-green-600 w-fit text-white absolute top-[-12px] left-5">
              <GoChecklist />
            </p>
            <p className="text-lg font-semibold text-right px-6 pt-3 text-gray-700">
              Average marks
            </p>
            <h1 className="text-5xl text-right pr-12 pt-4">{totalMarks}</h1>
          </div>

          <div className="bg-white w-full h-[8rem] rounded-md shadow-lg relative">
            <p className="text-2xl p-2 rounded-md bg-yellow-400 w-fit text-white absolute top-[-12px] left-5">
              <MdTipsAndUpdates />
            </p>
            <p className="text-lg font-semibold text-right px-6 pt-3 text-gray-700">
              No of events
            </p>
            <h1 className="text-5xl text-right pr-12 pt-4">0</h1>
          </div>

          <div className="bg-white w-full h-[8rem] rounded-md shadow-lg relative">
            <p className="text-2xl p-2 rounded-md bg-yellow-400 w-fit text-white absolute top-[-12px] left-5">
              <MdTipsAndUpdates />
            </p>
            <p className="text-lg font-semibold text-right px-6 pt-3 text-gray-700">
              No of events
            </p>
            <h1 className="text-5xl text-right pr-12 pt-4">0</h1>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentStats;
