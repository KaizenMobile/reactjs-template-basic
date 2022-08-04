import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/forms/signIn/SignIn';
import LoggedIn from './components/forms/loggedIn/LoggedIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="loggedIn" element={<LoggedIn />} />
      </Routes>
    </Router>
  );
}

export default App;
