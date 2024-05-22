import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  React.useEffect(() => {
    switch (role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      case 'head':
        navigate('/head-dashboard');
        break;
      case 'student':
        navigate('/student-dashboard');
        break;
      default:
        navigate('/login');
        break;
    }
  }, [role, navigate]);

  return (
    <div>
      <h1>Loading your dashboard...</h1>
    </div>
  );
}

export default Dashboard;
