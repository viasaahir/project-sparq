import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import JobBoardModule from './modules/jobBoard/JobBoardModule';
import ResumeUpload from './components/resume/ResumeUpload';
import LandingHero from './components/landing/LandingHero';

function MainPage() {
  const navigate = useNavigate();

  const handleUploadResume = () => {
    navigate('/resume');
  };

  const handleBrowseJobs = () => {
    navigate('/jobs');
  };

  return (
    <LandingHero 
      onUploadResume={handleUploadResume}
      onBrowseJobs={handleBrowseJobs}
    />
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/jobs" element={<JobBoardModule />} />
          <Route path="/resume" element={<ResumeUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
