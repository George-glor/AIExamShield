import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App'; // Ensure App is imported correctly
import './index.css'; // Optional: If you have a global CSS file

// Use React 18's createRoot method instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the 'root' div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);
