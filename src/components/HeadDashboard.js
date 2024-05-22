import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const HeadDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Head of Department Dashboard</h1>
      <div className="dashboard-sections">
        <Link to="/manage-courses" className="dashboard-section">
          <h2>Manage Courses</h2>
          <p>Add, edit, or remove courses.</p>
        </Link>
        <Link to="/manage-teachers" className="dashboard-section">
          <h2>Manage Teachers</h2>
          <p>Add, edit, or remove teachers.</p>
        </Link>
        <Link to="/view-reports" className="dashboard-section">
          <h2>View Reports</h2>
          <p>View department reports and statistics.</p>
        </Link>
      </div>
    </div>
  );
}

export default HeadDashboard;
