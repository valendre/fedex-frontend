import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

export default function (props) {
  const [requestWithToken] = useRequest();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function fetchCohortMembers() {
      let response = await requestWithToken("GET", "/cohort/" + props.id);
      setStudentList(response);
      console.log(response);
    }
    fetchCohortMembers();
  }, [props.id]);

  return (
    <div className="studentcontroller">
      {studentList.map((student) => (
          <div>
            <div>{student.id}</div>
            <div>{student.username}</div>
            <div>{student.suspiciousLevel}</div>
          </div>
      ))}
    </div>
  );
}
