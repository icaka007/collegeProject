import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedGrades, setEditedGrades] = useState('');

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

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditedGrades(student.grades.join(' '));
  };

  const handleSave = async () => {
    try {
      const gradesArray = editedGrades.split(' ').map(Number);
      await axios.put(
        `http://localhost:3001/api/teachers/${teacher._id}/students/${editingStudent._id}/majors/${teacher.major}/grades`,
        { grades: gradesArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setTeacher((prevTeacher) => ({
        ...prevTeacher,
        students: prevTeacher.students.map((student) =>
          student._id === editingStudent._id ? { ...student, grades: gradesArray } : student
        )
      }));
      setEditingStudent(null);
    } catch (error) {
      console.error('Error saving grades', error);
    }
  };

  const handleGradeChange = (event) => {
    setEditedGrades(event.target.value);
  };

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
        </div>
        <div className="students-section">
          <h2 className="dashboard-subheader">Students and Grades</h2>
          <div className="students-list">
            {teacher.students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>{student.username}</h3>
                <p>Grades: {student.grades.join(', ')}</p>
                <button onClick={() => handleEdit(student)}>Edit Grades</button>
                {editingStudent && editingStudent._id === student._id && (
                  <div>
                    <input
                      type="text"
                      value={editedGrades}
                      onChange={handleGradeChange}
                      placeholder="Enter grades separated by spaces"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingStudent(null)}>Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
