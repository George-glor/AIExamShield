// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/admin-dashboard" component={AdminPage} />
        <Route path="/teacher-dashboard" component={TeacherPage} />
        <Route path="/student-dashboard" component={StudentPage} />
      </Switch>
    </Router>
  );
}

export default App;
