// TeacherPage.js
import React, { useEffect, useState } from 'react';
import TeacherDashboard from '../components/TeacherDashboard';

const TeacherPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the teacher is logged in
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user && JSON.parse(user).role === 'teacher') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <p>Please log in as a Teacher to access this page.</p>;
  }

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <TeacherDashboard />
    </div>
  );
};

export default TeacherPage;
