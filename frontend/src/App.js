import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage /> } />
        <Route path="/login" element={<LoginPage /> }/>
        <Route path="/register" element={<RegisterPage /> }/>
        <Route path="/home" element={<HomePage /> }/>
        <Route path="/history" element={<HistoryPage /> }/>
      </Routes>
    </Router>
  );
}

export default App;