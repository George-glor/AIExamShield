// TeacherDashboard.js
import React, { useState } from 'react';
import { createExam } from '../services/examService';

const TeacherDashboard = () => {
  const [examName, setExamName] = useState('');
  const [examDescription, setExamDescription] = useState('');

  const handleCreateExam = async (e) => {
    e.preventDefault();
    const examData = { name: examName, description: examDescription };
    await createExam(examData);
    alert('Exam created successfully!');
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <form onSubmit={handleCreateExam}>
        <input
          type="text"
          placeholder="Exam Name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
        <textarea
          placeholder="Exam Description"
          value={examDescription}
          onChange={(e) => setExamDescription(e.target.value)}
        />
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
};

export default TeacherDashboard;
