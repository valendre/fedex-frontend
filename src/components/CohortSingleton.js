import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import SockJsClient from "react-stomp";

export default function (props) {
  const [requestWithToken] = useRequest();
  const [message, setMessage] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function fetchCohortMembers() {
      let response = await requestWithToken("GET", "/cohort/" + props.id);
      setStudentList(response.students);
      console.log(response);
    }
    if (firstLoad) {
      fetchCohortMembers();
    }
    setFirstLoad(true);
  }, [props.id, message]);

  return (
    <div className="studentcontroller">
      <SockJsClient
        url="http://localhost:8080/websocket-fedex"
        topics={["/topic/cohort"]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
          console.log(msg);
          let studentListCopy = studentList;
          for (let i = 0; i < studentListCopy.length; i++) {
            if (studentListCopy[i].id === msg.id) {
              studentListCopy[i].suspiciousLevel = msg.suspiciousLevel;
              setStudentList(studentListCopy);
              break;
            }
          }
          setFirstLoad(false);
          setMessage(msg);
        }}
      />

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
