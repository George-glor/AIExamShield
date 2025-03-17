// StudentPage.js
import React, { useEffect, useState } from 'react';
import ExamDashboard from '../components/ExamDashboard';

const StudentPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the student is logged in
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user && JSON.parse(user).role === 'student') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    }, []);
  
    return (
      <div>
        {isAuthenticated ? <ExamDashboard /> : <p>Please log in to view your exams.</p>}
      </div>
    );
  };
