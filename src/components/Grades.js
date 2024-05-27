import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Grades() {
    const [grades, setGrades] = useState([]);
    const studentId = 'some-student-id'; // Replace this with actual student ID

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/grades/${studentId}/grades`);
                setGrades(response.data);
            } catch (error) {
                console.error('Error fetching grades', error);
            }
        };
        fetchGrades();
    }, [studentId]);

    return (
        <div className="grades-container">
            <h2>Your Grades</h2>
            {grades.map((major, index) => (
                <div key={index} className="major-grades">
                    <h3>{major.major.name}</h3>
                    <ul>
                        {major.grades.map((grade, idx) => (
                            <li key={idx}>{grade}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Grades;
