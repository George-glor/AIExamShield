// ExamDashboard.js
import React, { useEffect, useState } from 'react';
import { getExamDetails } from '../services/examService';

const ExamDashboard = () => {
  const [examDetails, setExamDetails] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      const data = await getExamDetails();
      setExamDetails(data);
    };
    fetchExamDetails();
  }, []);

  return (
    <div>
      <h1>Exam Dashboard</h1>
      {examDetails ? (
        <div>
          <h2>{examDetails.name}</h2>
          <p>{examDetails.description}</p>
          <button>Start Exam</button>
        </div>
      ) : (
        <p>Loading exam details...</p>
      )}
    </div>
  );
};

export default ExamDashboard;
