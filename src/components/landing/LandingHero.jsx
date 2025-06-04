import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineRefresh, HiOutlineLightningBolt } from 'react-icons/hi';
import { FiArrowRight, FiChevronRight } from 'react-icons/fi';
import AnimatedLightning from '../common/AnimatedLightning';

const pathVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const LandingHero = ({ onUploadResume, onBrowseJobs }) => {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x"
  });
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 blur-[100px] opacity-30 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] -z-10" />
        
        <div className="max-w-4xl w-full mx-auto">
          {/* Main Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12 text-center"
          >
            {/* Header */}
            <div className="space-y-6">
              <motion.h1
                variants={itemVariants} 
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent inline-flex items-center gap-4"
              >
                Find Your Next Tech Role
                <AnimatedLightning />
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-400"
              >
                AI-powered job matching for tech professionals
              </motion.p>
            </div>

            {/* Upload Resume Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-gray-800">
                <svg
                  className="w-8 h-8 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-white">Upload Your Resume</h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Let our AI analyze your resume and match you with relevant tech opportunities. Get personalized job recommendations in seconds.
              </p>
              
              <motion.button
                onClick={onUploadResume}
                className="group relative inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload Resume
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-50 -z-10 group-hover:opacity-75 transition-opacity" />
              </motion.button>
            </motion.div>

            {/* Browse Jobs Link */}
            <motion.div
              variants={itemVariants}
              className="pt-4"
            >
              <button
                onClick={onBrowseJobs}
                className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-lg"
              >
                Or browse available jobs
                <FiArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>



      {/* Features Section */}
      <motion.div 
        className="relative max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-2xl opacity-30 -z-10" />
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiOutlineLightningBolt className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">AI-Powered Matching</h4>
            <p className="text-gray-400">Smart algorithms analyze your profile to find roles that perfectly match your skills and aspirations</p>
          </motion.div>
          
          <motion.div 
            className="group relative p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-purple-600/5 border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiOutlineAcademicCap className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Learning Resources</h4>
            <p className="text-gray-400">Access curated learning paths and resources tailored to your career goals</p>
          </motion.div>
          
          <motion.div 
            className="group relative p-6 rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/10"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiOutlineRefresh className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Career Support</h4>
            <p className="text-gray-400">Get personalized guidance and support throughout your career transition journey</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingHero;
