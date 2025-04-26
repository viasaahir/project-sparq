import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import RoleArcLogo from './components/shared/RoleArcLogo';
import LoginDropdown from './components/shared/LoginDropdown';
import ResumeModule from './modules/resume/ResumeModule';
import JobBoardModule from './modules/jobBoard/JobBoardModule';
import WelcomeSplash from './components/onboarding/WelcomeSplash';
import { MapPinIcon } from '@heroicons/react/24/outline';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  // Check if user has seen welcome screen before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Welcome Splash */}
      <WelcomeSplash isOpen={showWelcome} onClose={handleWelcomeClose} />

      {/* Top Navigation Bar */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-11">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <RoleArcLogo size={32} />
              
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

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2
                ${
                  selected
                    ? 'bg-white text-primary-700 shadow'
                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary-600'
                }`
              }
            >
              Resume Builder & Jobs
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2
                ${
                  selected
                    ? 'bg-white text-primary-700 shadow'
                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary-600'
                }`
              }
            >
              Job Board
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ResumeModule />
            </Tab.Panel>
            <Tab.Panel>
              <JobBoardModule />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  );
}

export default App;
