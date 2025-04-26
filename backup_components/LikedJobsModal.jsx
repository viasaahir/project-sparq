import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

const LikedJobsModal = ({ isOpen, onClose, likedJobs }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden relative"
          >
            {/* Close Button */}
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={onClose}
                className="group p-1.5 hover:bg-gray-50 rounded-full transition-all"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6 text-gray-300 group-hover:text-gray-400" />
              </button>
            </div>

            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-600 bg-opacity-10 rounded-full flex items-center justify-center">
                  <HeartIcon className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Your Liked Jobs
              </h2>
              <p className="text-center text-gray-600 mb-6">
                {likedJobs.length} {likedJobs.length === 1 ? 'job' : 'jobs'} saved
              </p>
            </div>

            {/* Job List */}
            <div className="px-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {likedJobs.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No liked jobs yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Jobs you like will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pb-6">
                  {likedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="group p-4 rounded-xl border border-gray-200 hover:border-indigo-200 transition-all cursor-pointer bg-white hover:bg-indigo-50/50"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="h-12 w-12 rounded-xl flex-shrink-0 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {job.company}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {job.location}
                            </span>
                            {job.salary && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {job.matchScore && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                              {job.matchScore}% Match
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LikedJobsModal;
