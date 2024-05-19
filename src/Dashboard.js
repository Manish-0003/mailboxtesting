// src/Dashboard.js

import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="dashboard">
        <Header />
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Dashboard</h1>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default Dashboard;
