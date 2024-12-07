import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../../../../../redux/slice/UserSlice";

const SubjectStats = () => {
  const [subjectCounts, setSubjectCounts] = useState({});
  const studentData = useSelector((state) => state.users.students);
  const dispatch = useDispatch();

  const calculateSubjectCounts = () => {
    const counts = {
      aws: 0,
      java: 0,
      python: 0,
      javascript: 0,
      c: 0,
    };

    studentData?.forEach((student) => {
      if (counts[student.Course] !== undefined) {
        counts[student.Course]++;
      }
    });

    setSubjectCounts(counts);
  };

  useEffect(() => {
    dispatch(getStudents()).then(() => calculateSubjectCounts());
  }, [dispatch, studentData]);

  return (
    <div>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["AWS", "Java", "Python", "C++", "Javascript"],
          },
        ]}
        series={[
          {
            data: [
              subjectCounts.aws || 0,
              subjectCounts.java || 0,
              subjectCounts.python || 0,
              subjectCounts.c || 0,
              subjectCounts.javascript || 0,
            ],
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
};

export default SubjectStats;
