import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/teachers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers', error);
    }
  };

  const handleCreateTeacher = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/teachers', newTeacher, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeachers(); // Refresh the list
      setNewTeacher({ name: '', email: '', password: '' }); // Reset form
    } catch (error) {
      console.error('Error creating teacher', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher._id}>{teacher.name} - {teacher.email}</li>
        ))}
      </ul>

      <h2>Create Teacher</h2>
      <input
        type="text"
        placeholder="Name"
        value={newTeacher.name}
        onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newTeacher.email}
        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newTeacher.password}
        onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
      />
      <button onClick={handleCreateTeacher}>Create Teacher</button>
    </div>
  );
};

export default AdminDashboard;