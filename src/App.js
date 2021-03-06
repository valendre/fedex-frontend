import React, {useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import LoggedIn from './components/LoggedIn';
import {useSelector} from "react-redux";

export default function App() {
    const userFromRedux = useSelector(state => state.auth);
    useEffect(()=>{},
        [userFromRedux.isLoggedIn]);

  return (
    <div className="App">
        {userFromRedux.isLoggedIn ? <LoggedIn /> : <Login />}
    </div>
  );
}
