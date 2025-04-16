import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import DocumentPage from './pages/DocumentPage';
import OCRPage from './pages/OCRPage';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage /> } />
        <Route path="/login" element={<LoginPage /> }/>
        <Route path="/register" element={<RegisterPage /> }/>
        <Route path="/home" element={<HomePage /> }/>
        <Route path="/ocr" element={<OCRPage /> }/>
        <Route path="/history" element={<HistoryPage /> }/>
        <Route path="/history/:docId" element={<DocumentPage />} />
      </Routes>
    </Router>
  );
}

export default App;