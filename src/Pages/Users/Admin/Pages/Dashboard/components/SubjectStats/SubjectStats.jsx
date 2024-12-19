import React, { useEffect, useState, useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../../../../../redux/slice/UserSlice";

const SubjectStats = () => {
  const [subjectCounts, setSubjectCounts] = useState({});
  const studentData = useSelector((state) => state.users.students);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch students data only once when the component mounts
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    // Calculate counts when studentData changes
    if (studentData?.length) {
      const counts = studentData.reduce(
        (acc, student) => {
          if (acc[student.Course] !== undefined) {
            acc[student.Course]++;
          }
          return acc;
        },
        { aws: 0, java: 0, python: 0, javascript: 0, c: 0 }
      );

      setSubjectCounts(counts);
    }
  }, [studentData]);

  return (
    <div className="bg-white rounded-lg col-span-2 row-span-3 flex items-center" >
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
        width={450}
        height={400}
      />
    </div>
  );
};

export default SubjectStats;
