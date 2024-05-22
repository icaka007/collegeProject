import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/students/courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching student courses', error);
      }
    };

    const fetchAvailableCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/courses');
        setAvailableCourses(response.data);
      } catch (error) {
        console.error('Error fetching available courses', error);
      }
    };

    fetchCourses();
    fetchAvailableCourses();
  }, []);

  const handleEnroll = async () => {
    if (!selectedCourse) {
      alert('Please select a course to enroll');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3001/api/students/enroll',
        { courseId: selectedCourse },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert('Enrolled successfully');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error enrolling in course', error);
      alert('Failed to enroll');
    }
  };

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <h2>My Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.name}</li>
        ))}
      </ul>
      <h2>Enroll in a new course</h2>
      <div className="enroll-section">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">Select a course</option>
          {availableCourses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
        <button onClick={handleEnroll} className="enroll-button">Enroll</button>
      </div>
    </div>
  );
}

export default StudentDashboard;
