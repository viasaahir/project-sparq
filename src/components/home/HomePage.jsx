import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUpload, HiOutlineSearch } from 'react-icons/hi';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full mx-auto text-center space-y-12">
        {/* Header */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white">
            Let's Get Started
          </h1>
          <p className="text-xl text-gray-300">
            Choose how you'd like to explore opportunities with RoleArc
          </p>
        </motion.div>

        {/* Options */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Upload Resume */}
          <Link 
            to="/resume"
            className="group relative rounded-xl bg-[#0a1120]/50 p-8 hover:bg-[#0a1120]/70 transition-colors"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                <HiOutlineUpload className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Upload Your Resume</h3>
              <p className="text-gray-300 text-center">
                Get personalized job recommendations and AI-powered resume analysis
              </p>
            </div>
          </Link>

          {/* Browse Jobs */}
          <Link 
            to="/jobs"
            className="group relative rounded-xl bg-[#0a1120]/50 p-8 hover:bg-[#0a1120]/70 transition-colors"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                <HiOutlineSearch className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Browse Jobs</h3>
              <p className="text-gray-300 text-center">
                Explore our curated list of opportunities from top companies
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 rounded-lg bg-[#0a1120]/50">
            <h4 className="text-lg font-medium text-white mb-2">AI-Powered Matching</h4>
            <p className="text-gray-300">Smart job recommendations based on your skills and experience</p>
          </div>
          <div className="p-6 rounded-lg bg-[#0a1120]/50">
            <h4 className="text-lg font-medium text-white mb-2">Resume Analysis</h4>
            <p className="text-gray-300">Get insights and suggestions to improve your resume</p>
          </div>
          <div className="p-6 rounded-lg bg-[#0a1120]/50">
            <h4 className="text-lg font-medium text-white mb-2">Real-time Updates</h4>
            <p className="text-gray-300">Stay informed with the latest job opportunities</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
