import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import SockJsClient from 'react-stomp';


export default function (props) {
  const [requestWithToken] = useRequest();
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    async function fetchStudent() {
      let response = await requestWithToken("GET", "/student/" + props.id);
      setStudentInfo({username: "andi", processes: [{name: "shebang.exe", memoryUsage: "69 MB"}, {name: "shebang.exe", memoryUsage: "69 MB"}]});
    }
    fetchStudent();
  }, []);

  return (
    <div className="studentInfo">
      
      <h3>{studentInfo.username}</h3>
      <h4>Processes</h4>
      <ul>
        {studentInfo.processes.map((process) => (
          <li>
            {"Name: " + process.name + "Memory usage: " + process.memoryUsage}
          </li>
        ))}
      </ul>
    </div>
  );
}
