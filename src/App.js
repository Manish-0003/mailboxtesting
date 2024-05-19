// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Mail from './Mail';
import SentMails from './SentMails'; // Import Mail component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/mail" element={isLoggedIn ? <Mail /> : <Navigate to="/login" />} /> {/* Add route for Mail component */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sent-mails" element={<SentMails />} />
      </Routes>

    </Router>
  );
};

export default App;
