import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({ name: '', startTime: '', duration: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/teacher/exams', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(response.data.exams);
    } catch (error) {
      console.error('Error fetching exams', error);
    }
  };

  const handleCreateExam = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/teacher/exams', newExam, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExams(); // Refresh the list
      setNewExam({ name: '', startTime: '', duration: '' }); // Reset form
    } catch (error) {
      console.error('Error creating exam', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Exams</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>{exam.name} - {exam.startTime}</li>
        ))}
      </ul>

      <h2>Create Exam</h2>
      <input
        type="text"
        placeholder="Exam Name"
        value={newExam.name}
        onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
      />
      <input
        type="datetime-local"
        placeholder="Start Time"
        value={newExam.startTime}
        onChange={(e) => setNewExam({ ...newExam, startTime: e.target.value })}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={newExam.duration}
        onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
      />
      <button onClick={handleCreateExam}>Create Exam</button>
    </div>
  );
};

export default TeacherDashboard;