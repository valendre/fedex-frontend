import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import SockJsClient from 'react-stomp';


export default function (props) {
  const [requestWithToken] = useRequest();
  const [studentInfo, setStudentInfo] = useState(undefined);


  useEffect(() => {
    async function fetchStudent() {
      let response = await requestWithToken("GET", "/student/" + props.id);
      //setStudentInfo({username: "andi", activities: [{name: "shebang.exe", memoryUsage: "69 MB"}, {name: "shebang.exe", memoryUsage: "69 MB"}]});
      setStudentInfo(response);
    }
    fetchStudent();
  }, [props.id]);

  return (
    <div className="studentInfo">
      
      <h3>{studentInfo ? studentInfo.username : null}</h3>
      <h4>Processes</h4>
      <div className="table">
        {(studentInfo&&studentInfo.activities) ? studentInfo.activities.map((process) => (
          <div>
            {"Name: " + process.name + "Memory usage: " + process.memoryUsage}
          </div>
        )) : null}
      </div>
    </div>
  );
}
