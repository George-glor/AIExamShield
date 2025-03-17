// AdminPage.js
import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the admin is logged in
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user && JSON.parse(user).role === 'admin') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <p>Please log in as an Admin to access this page.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
