// LoginForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/authService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      // Redirect based on user role
      if (response.role === 'admin') {
        history.push('/admin-dashboard');
      } else if (response.role === 'teacher') {
        history.push('/teacher-dashboard');
      } else if (response.role === 'student') {
        history.push('/student-dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
