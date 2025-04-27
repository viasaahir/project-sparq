import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { HiOutlineFire, HiOutlineChartBar } from 'react-icons/hi';
import JobSearch from '../../components/jobs/JobSearch';
import InternPortal from '../../components/jobs/InternPortal';
import JobCard from '../../components/jobs/JobCard';
import RollyIcon from '../../components/shared/RollyIcon';
import { mockJobs } from '../../services/mockJobs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const mockConnections = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    degree: 1
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Engineering Manager",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    degree: 2
  }
];

const mockConsultants = [
  {
    id: 1,
    name: "David Kim",
    role: "Technical Recruiter",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Senior Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  }
];

const JobBoardModule = () => {
  const [jobs, setJobs] = useState([]);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Set initial trending jobs
    const trending = mockJobs
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setTrendingJobs(trending);
  }, []);

  const handleSearch = async (prompt) => {
    setIsSearching(true);
    
    // TODO: Replace with actual API call
    // Simulating API call with mock data
    setTimeout(() => {
      const filteredJobs = mockJobs.filter(job => {
        const searchTerms = prompt.toLowerCase();
        const matchesExperience = searchTerms.includes(job.experienceLevel.toLowerCase());
        const matchesSalary = job.salary >= (searchTerms.includes('120k') ? 120000 : 0);
        const matchesLocation = searchTerms.includes(job.location.toLowerCase());
        const matchesType = job.employmentType.toLowerCase().includes(
          searchTerms.includes('intern') ? 'intern' : 'full-time'
        );
        
        return matchesExperience || matchesSalary || matchesLocation || matchesType;
      });
      
      setJobs(filteredJobs);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with RoleArc branding */}
      <div className="bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <RollyIcon width={48} height={48} />
              <h1 className="text-4xl font-bold text-white">RoleArc</h1>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl">
              Discover your next career opportunity with personalized job matches and industry insights
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-2 rounded-xl bg-white/5 p-1 mb-12">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-indigo-400 focus:outline-none',
                  selected
                    ? 'bg-white text-indigo-600 shadow'
                    : 'text-gray-400 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Professional Roles
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-indigo-400 focus:outline-none',
                  selected
                    ? 'bg-white text-indigo-600 shadow'
                    : 'text-gray-400 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Student Opportunities
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Professional Roles Panel */}
            <Tab.Panel>
              <div className="space-y-12">
                <JobSearch onSearch={handleSearch} isProcessing={isSearching} />
                
                {/* Trending Roles Section */}
                {!jobs.length && trendingJobs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <HiOutlineFire className="w-6 h-6 text-orange-500" />
                      <h2 className="text-xl font-semibold text-white">Trending Roles</h2>
                    </div>
                    <div className="grid gap-6">
                      {trendingJobs.map((job) => (
                        <JobCard 
                          key={job.id} 
                          job={job}
                          connections={mockConnections}
                          consultants={mockConsultants}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Search Results */}
                {isSearching ? (
                  <div className="text-center text-gray-400">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mx-auto w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
                    />
                    <p className="mt-4">Finding the perfect roles for you...</p>
                  </div>
                ) : jobs.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <HiOutlineChartBar className="w-6 h-6 text-indigo-400" />
                      <h2 className="text-xl font-semibold text-white">Matched Roles</h2>
                    </div>
                    <div className="grid gap-6">
                      {jobs.map((job) => (
                        <JobCard 
                          key={job.id} 
                          job={job}
                          connections={mockConnections}
                          consultants={mockConsultants}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Tab.Panel>

            {/* Student Opportunities Panel */}
            <Tab.Panel>
              <div className="space-y-12">
                <InternPortal onSearch={handleSearch} />
                
                {/* Trending Internships */}
                {!jobs.length && trendingJobs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <HiOutlineFire className="w-6 h-6 text-orange-500" />
                      <h2 className="text-xl font-semibold text-white">Featured Opportunities</h2>
                    </div>
                    <div className="grid gap-6">
                      {trendingJobs
                        .filter(job => job.employmentType === "Internship")
                        .map((job) => (
                          <JobCard 
                            key={job.id} 
                            job={job}
                            connections={mockConnections}
                            consultants={mockConsultants}
                          />
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Search Results */}
                {isSearching ? (
                  <div className="text-center text-gray-400">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mx-auto w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
                    />
                    <p className="mt-4">Finding internship opportunities...</p>
                  </div>
                ) : jobs.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <HiOutlineChartBar className="w-6 h-6 text-indigo-400" />
                      <h2 className="text-xl font-semibold text-white">Matched Opportunities</h2>
                    </div>
                    <div className="grid gap-6">
                      {jobs.map((job) => (
                        <JobCard 
                          key={job.id} 
                          job={job}
                          connections={mockConnections}
                          consultants={mockConsultants}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default JobBoardModule;
