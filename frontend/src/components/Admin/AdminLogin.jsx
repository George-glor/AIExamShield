import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // To make HTTP requests
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login data to the backend API
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
        specialCode,
        micTestPassed: true, // Assuming mic test is passed
      });

      // If login is successful, redirect to the admin dashboard
      if (response.status === 200) {
        // Save the token if needed for subsequent requests
        localStorage.setItem("token", response.data.token); // Storing JWT token in localStorage for example
        navigate("/admin/dashboard");
      }
    } catch (err) {
      // Handle any errors (wrong credentials, server issues)
      setError(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Special Code"
          value={specialCode}
          onChange={(e) => setSpecialCode(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
adminRoutes