import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import JobBoardModule from './modules/jobBoard/JobBoardModule';
import ResumeUpload from './components/resume/ResumeUpload';
import WelcomeSplash from './components/onboarding/WelcomeSplash';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          <Route path="/" element={<WelcomeSplash />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/jobs" element={<JobBoardModule />} />
          <Route path="/resume" element={<ResumeUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
