import React, { useState, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/userSlice";
import { auth } from "./firebase";
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import SentMails from './components/SentMails'; 
import Mail from './components/Mail';




function App  () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          
        }));
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App"> 
        
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/mail" element={isLoggedIn ? <Mail /> : <Navigate to="/login" />} /> 
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sent-mails" element={<SentMails />} />
      </Routes>
    
      </div>
    </Router>
  );
};

export default App;