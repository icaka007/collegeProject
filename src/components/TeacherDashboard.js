import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/teachers/courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching teacher courses', error);
      }
    };

    fetchCourses();
  }, []);

  const fetchStudents = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/courses/${courseId}/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const handleGradeChange = (studentId, grade) => {
    setGrades({
      ...grades,
      [studentId]: grade
    });
  };

  const handleSaveGrades = async () => {
    try {
      await axios.post(
        `http://localhost:3001/api/courses/${selectedCourse}/grades`,
        { grades },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert('Grades saved successfully');
    } catch (error) {
      console.error('Error saving grades', error);
      alert('Failed to save grades');
    }
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>My Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <button onClick={() => {
              setSelectedCourse(course._id);
              fetchStudents(course._id);
            }}>
              {course.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedCourse && (
        <div>
          <h2>Manage Grades for {courses.find(course => course._id === selectedCourse).name}</h2>
          <ul>
            {students.map(student => (
              <li key={student._id}>
                {student.name}
                <input
                  type="number"
                  value={grades[student._id] || ''}
                  onChange={(e) => handleGradeChange(student._id, e.target.value)}
                />
              </li>
            ))}
          </ul>
          <button onClick={handleSaveGrades}>Save Grades</button>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
