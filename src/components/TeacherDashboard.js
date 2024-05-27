import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher data', error);
      }
    };

    fetchTeacherData();
  }, []);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="teacher-dashboard">
        <h1 className="dashboard-header">Teacher Dashboard</h1>
        <div className="teacher-info">
          <h2>{teacher.username}</h2>
          <p>Department: {teacher.department}</p>
          {teacher.majors && teacher.majors.length > 0 && (
            <div>
              <h3>Major: {teacher.majors[0].major}</h3>
            </div>
          )}
        </div>
        <div className="students-section">
          <h2 className="dashboard-subheader">Students and Grades</h2>
          <div className="students-list">
            {teacher.students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>{student.username}</h3>
                <p>Grades: {student.grades.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
