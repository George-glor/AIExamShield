// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/student-dashboard">Student Dashboard</Link></li>
          <li><Link to="/teacher-dashboard">Teacher Dashboard</Link></li>
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
