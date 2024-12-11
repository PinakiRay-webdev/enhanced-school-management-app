import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { doc, getDoc , } from "firebase/firestore";
import {db} from '../../../../../../../utils/firebase/firebase-config'

const StudentPerformance = () => {
  const selectedStudent = useSelector((state) =>
    state.users.students.find(
      (e) =>
        e.Email === JSON.parse(localStorage.getItem("studentCredentials")).mail
    )
  );
  const [marks, setMarks] = useState([]);
  const [studentID, setstudentID] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      setstudentID(selectedStudent.id);
    }
  }, [selectedStudent]);

  const getMarks = async () => {
    try {
      const studentRef = doc(db , "student marks" , studentID);
      const studentSnap = await getDoc(studentRef)
  
      if(studentSnap.exists()){
        const marksheet = []
        studentSnap.data().terms.forEach(element => {
          marksheet.push(element.mark)
          setMarks(marksheet)
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    getMarks()
  },[studentID])

  

  return (
    <div>
      <div className="bg-white rounded-md mx-3 my-2">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Term 1", "Term 2", "Term 3", "Term 4", "Term 5"],
            },
          ]}
          series={[{ data: marks }]}
          width={800}
          height={500}
        />
      </div>
    </div>
  );
};

export default StudentPerformance;
