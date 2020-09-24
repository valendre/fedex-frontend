import React, {useState} from 'react';
import './App.css';
import Login from './components/Login';
import LoggedIn from './components/LoggedIn';
import {useSelector} from "react-redux";

export default function App() {
    const userFromRedux = useSelector(state => state.auth);
    const [isLoggedin, setIsLoggedin] = useState(userFromRedux.isLoggedIn);

  return (
    <div className="App">
        {isLoggedin ? <LoggedIn /> : <Login />}
    </div>
  );
}
