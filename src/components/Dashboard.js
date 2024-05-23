import React from 'react';
import Sidebar from './Sidebar';
import '../css/Dashboard.css';
import Header from './Header';
import { useDispatch } from 'react-redux';

function Dashboard() {  
  const dispatch = useDispatch();

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
