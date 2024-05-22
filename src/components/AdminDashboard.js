import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [rector, setRector] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    // Fetch all data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, departmentsRes, facultiesRes, rectorRes, teachersRes, studentsRes, coursesRes, programsRes] = await Promise.all([
        axios.get('http://localhost:3001/api/users'),
        axios.get('http://localhost:3001/api/departments'),
        axios.get('http://localhost:3001/api/faculties'),
        axios.get('http://localhost:3001/api/rector'),
        axios.get('http://localhost:3001/api/teachers'),
        axios.get('http://localhost:3001/api/students'),
        axios.get('http://localhost:3001/api/courses'),
        axios.get('http://localhost:3001/api/programs')
      ]);

      setUsers(usersRes.data);
      setDepartments(departmentsRes.data);
      setFaculties(facultiesRes.data);
      setRector(rectorRes.data);
      setTeachers(teachersRes.data);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
      setPrograms(programsRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${type}/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error(`Error deleting ${type}`, error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.username} ({user.role})
              <button onClick={() => handleDelete('users', user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Departments</h2>
        <ul>
          {departments.map(department => (
            <li key={department._id}>
              {department.name}
              <button onClick={() => handleDelete('departments', department._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Faculties</h2>
        <ul>
          {faculties.map(faculty => (
            <li key={faculty._id}>
              {faculty.name}
              <button onClick={() => handleDelete('faculties', faculty._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Rector</h2>
        {rector && (
          <div>
            <p>{rector.name}</p>
            <button onClick={() => handleDelete('rector', rector._id)}>Delete</button>
          </div>
        )}
      </section>

      <section>
        <h2>Teachers</h2>
        <ul>
          {teachers.map(teacher => (
            <li key={teacher._id}>
              {teacher.name}
              <button onClick={() => handleDelete('teachers', teacher._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Students</h2>
        <ul>
          {students.map(student => (
            <li key={student._id}>
              {student.name}
              <button onClick={() => handleDelete('students', student._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Courses</h2>
        <ul>
          {courses.map(course => (
            <li key={course._id}>
              {course.name}
              <button onClick={() => handleDelete('courses', course._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Programs</h2>
        <ul>
          {programs.map(program => (
            <li key={program._id}>
              {program.name}
              <button onClick={() => handleDelete('programs', program._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
