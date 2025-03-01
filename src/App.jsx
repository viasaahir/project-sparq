import { useState } from 'react';
import { mockJobs } from './services/mockJobs.jsx';
import JobCard from './components/JobCard';
import AdvancedFilters from './components/AdvancedFilters';
import RoleArcLogo from './components/RoleArcLogo';
import LoginDropdown from './components/LoginDropdown';
import { 
  HeartIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

function App() {
  const [likedJobs, setLikedJobs] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [activeFilters, setActiveFilters] = useState({
    roleType: [],
    workType: [],
    hourlyRate: [0, 200],
    location: ''
  });

  const handleLikeJob = (job) => {
    setLikedJobs(prev => {
      const isLiked = prev.some(likedJob => likedJob.id === job.id);
      if (isLiked) {
        return prev.filter(likedJob => likedJob.id !== job.id);
      }
      return [job, ...prev];
    });
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const filteredJobs = mockJobs.filter(job => {
    // Role Type filter
    if (activeFilters.roleType.length > 0 && !activeFilters.roleType.includes(job.employmentType)) {
      return false;
    }

    // Work Type filter
    if (activeFilters.workType.length > 0 && !activeFilters.workType.includes(job.workType)) {
      return false;
    }

    // Hourly Rate filter
    if (activeFilters.hourlyRate && job.hourlyRate) {
      const [min, max] = activeFilters.hourlyRate;
      if (job.hourlyRate < min || job.hourlyRate > max) {
        return false;
      }
    }

    // Location filter
    if (activeFilters.location && !job.location.toLowerCase().includes(activeFilters.location.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen w-full bg-gray-50">
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
              <button 
                className="flex items-center text-sm text-white hover:text-gray-200 transition-colors relative"
              >
                <HeartIcon className="h-4 w-4 mr-1 text-white" />
                <span>Liked Jobs</span>
                {likedJobs.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-black text-white rounded-full text-xs font-medium">
                    {likedJobs.length}
                  </span>
                )}
              </button>

              <LoginDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <AdvancedFilters 
          activeFilters={activeFilters} 
          onFilterChange={handleFilterChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Job listings */}
        <div className="w-full">
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onLike={() => handleLikeJob(job)}
                isLiked={likedJobs.some(likedJob => likedJob.id === job.id)}
                className="w-full"
              />
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center text-gray-500 py-8">No jobs found matching your filters.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
