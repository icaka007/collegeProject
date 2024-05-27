import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css';

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStudent(response.data);
        console.log(response.data); // Log response data
      } catch (error) {
        console.error('Error fetching student data', error);
      }
    };

    fetchStudentData();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="student-dashboard">
        <h1 className="dashboard-header">Student Dashboard</h1>
        <div className="student-info">
          <h2>{student.username}</h2>
          <p>Department: {student.department}</p>
        </div>
        <div className="majors-section">
          <h2 className="dashboard-subheader">Majors and Grades</h2>
          <div className="majors-list">
            {student.majors.map((major, index) => (
              <div key={index} className="major-card">
                <h3>{major.major}</h3>
                <p>Grades: {major.grades.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
