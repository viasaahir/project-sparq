import React, { useState } from 'react';
import { mockJobs } from '../../services/mockJobs';
import JobCard from '../../components/jobBoard/JobCard';
import { 
  AdjustmentsHorizontalIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const JobBoardModule = () => {
  const [filters, setFilters] = useState({
    roleType: [],
    workType: [],
    experienceLevel: [],
    salary: {
      min: 0,
      max: 200000,
      type: 'yearly' // yearly, hourly
    },
    location: '',
    remote: false,
    skills: [],
    company: '',
    postedWithin: 'any', // any, day, week, month
  });

  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredJobs = mockJobs.filter(job => {
    if (filters.roleType.length && !filters.roleType.includes(job.employmentType)) return false;
    if (filters.workType.length && !filters.workType.includes(job.workType)) return false;
    if (filters.experienceLevel.length && !filters.experienceLevel.includes(job.experienceLevel)) return false;
    if (filters.remote && !job.isRemote) return false;
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.company && !job.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
    
    // Salary filter
    if (job.salary) {
      const jobSalary = typeof job.salary === 'number' ? job.salary : parseInt(job.salary.replace(/[^0-9]/g, ''));
      if (jobSalary < filters.salary.min || jobSalary > filters.salary.max) return false;
    }

    // Skills filter
    if (filters.skills.length && !filters.skills.every(skill => 
      job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    )) return false;

    return true;
  });

  return (
    <div className="flex gap-6">
      {/* Filters Sidebar */}
      <div className={`w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-white rounded-lg shadow p-6 space-y-6 sticky top-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Role Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role Type</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={filters.roleType}
              onChange={(e) => handleFilterChange('roleType', Array.from(e.target.selectedOptions, option => option.value))}
              multiple
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-sm font-medium text-gray-700">Experience Level</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', Array.from(e.target.selectedOptions, option => option.value))}
              multiple
            >
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead</option>
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-sm font-medium text-gray-700">Salary Range</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.salary.min}
                onChange={(e) => handleFilterChange('salary', { ...filters.salary, min: parseInt(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Max"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.salary.max}
                onChange={(e) => handleFilterChange('salary', { ...filters.salary, max: parseInt(e.target.value) })}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="City, State, or Country"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          {/* Remote Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={filters.remote}
              onChange={(e) => handleFilterChange('remote', e.target.checked)}
            />
            <label className="ml-2 text-sm text-gray-700">Remote Only</label>
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium text-gray-700">Required Skills</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Add skills (comma separated)"
              value={filters.skills.join(', ')}
              onChange={(e) => handleFilterChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            />
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="flex-1">
        {!showFilters && (
          <button
            onClick={() => setShowFilters(true)}
            className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Show Filters
          </button>
        )}
        
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              className="w-full"
            />
          ))}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoardModule;
