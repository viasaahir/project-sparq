import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import RoleArcLogo from './components/shared/RoleArcLogo';
import LoginDropdown from './components/shared/LoginDropdown';
import ResumeUpload from './components/resume/ResumeUpload';
import JobBoardModule from './modules/jobBoard/JobBoardModule';
import WelcomeSplash from './components/onboarding/WelcomeSplash';
import HomePage from './components/home/HomePage';
import { MapPinIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-gray-50">
        {/* Top Navigation Bar */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-1.5 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-11">
              <div className="flex items-center space-x-8">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <RoleArcLogo size={32} />
                </Link>
                
                {/* Location */}
                <div className="flex items-center text-base text-white/80 hover:text-indigo-400 transition-colors cursor-pointer">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  <span>New York, USA</span>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="flex items-center space-x-4">
                <LoginDropdown />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<WelcomeSplash />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/jobs" element={<JobBoardModule />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
