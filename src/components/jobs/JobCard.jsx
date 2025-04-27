import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineChatAlt2, HiOutlineCalendar } from 'react-icons/hi';

const JobCard = ({ job, connections = [], consultants = [] }) => {
  const [showConsultants, setShowConsultants] = useState(false);
  const [showConnections, setShowConnections] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
    >
      <div className="flex justify-between items-start gap-6">
        {/* Company Logo */}
        <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg overflow-hidden">
          <img
            src={job.companyLogo || `https://logo.clearbit.com/${job.company.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`}
            alt={`${job.company} logo`}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              e.target.src = '/logos/default-company.png';
            }}
          />
        </div>

        {/* Job Details */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
          <p className="text-gray-400 mb-4">{job.company}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300">
              {job.employmentType}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300">
              {job.workType}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300">
              {job.experienceLevel}
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            {job.salary && <p>&#x1F4B0; ${job.salary.toLocaleString()} / year</p>}
            <p>&#x1F4CD; {job.location}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
            Apply
          </button>
          <button 
            onClick={() => setShowConnections(!showConnections)}
            className="px-6 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/30 transition-colors flex items-center gap-2"
          >
            <HiOutlineUserGroup className="w-5 h-5" />
            <span>{connections.length} Connections</span>
          </button>
          <button 
            onClick={() => setShowConsultants(!showConsultants)}
            className="px-6 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/30 transition-colors flex items-center gap-2"
          >
            <HiOutlineChatAlt2 className="w-5 h-5" />
            <span>Role Consultants</span>
          </button>
        </div>
      </div>

      {/* Connections Panel */}
      {showConnections && connections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-white/5 rounded-lg"
        >
          <h4 className="text-white font-medium mb-4">Your Connections at {job.company}</h4>
          <div className="grid gap-4">
            {connections.map((connection) => (
              <div key={connection.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{connection.name}</p>
                    <p className="text-sm text-gray-400">{connection.role}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
                  Message
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Consultants Panel */}
      {showConsultants && consultants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-white/5 rounded-lg"
        >
          <h4 className="text-white font-medium mb-4">Role Consultants</h4>
          <div className="grid gap-4">
            {consultants.map((consultant) => (
              <div key={consultant.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={consultant.avatar}
                    alt={consultant.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{consultant.name}</p>
                    <p className="text-sm text-gray-400">{consultant.role} at {job.company}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
                  <HiOutlineCalendar className="w-5 h-5" />
                  <span>Book Consultant</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobCard;
