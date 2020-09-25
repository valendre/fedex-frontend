import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import SockJsClient from "react-stomp";
import Student from "./Student";
import {logOut} from "../actions";

export default function (props) {
  const [requestWithToken] = useRequest();
  const [message, setMessage] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(undefined);

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
      <>
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
      <div className="notSuspicious studentColumn">
      <h3>not_suspicious</h3>
      {studentList.filter(student => student.suspiciousLevel === 0).map((student) => (
        <div className="studentTab" onClick={() => {setSelectedValue(student.id)}}>
          <div>Id: {student.id}</div>
          <div>{student.username}</div>
        </div>
      ))}
      </div>
      <div className="slightlySuspicious studentColumn">
      <h3>slightly_suspicious</h3>
      {studentList.filter(student => student.suspiciousLevel === 1).map((student) => (
          <div className="studentTab" onClick={() => {setSelectedValue(student.id)}}>
          <div>Id: {student.id}</div>
          <div>{student.username}</div>
        </div>
      ))}
      </div>
      <div className="suspicious studentColumn">
      <h3>very_suspicious</h3>
      {studentList.filter(student => student.suspiciousLevel === 2).map((student) => (
          <div className="studentTab" onClick={() => {setSelectedValue(student.id)}}>
          <div>Id: {student.id}</div>
          <div>{student.username}</div>
        </div>
      ))}
      </div>
    </div>
    {selectedValue ? <Student id={selectedValue}/> : null}
    </>
  );
}
