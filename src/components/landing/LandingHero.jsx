import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineRefresh, HiOutlineLightningBolt } from 'react-icons/hi';

const pathVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const LandingHero = ({ onPathSelect }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Path to Tech Success
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Whether you're a student or professional, we'll help you find your perfect role in tech
        </motion.p>
      </div>

      {/* Path Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Student Path */}
        <motion.div
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          onClick={() => onPathSelect('student')}
          className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <HiOutlineAcademicCap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Student Path</h3>
            <p className="text-gray-400">Launch your tech career with internships and entry-level positions matched to your studies</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Internship opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Entry-level positions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Resume building tips
              </li>
            </ul>
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 text-purple-400 font-medium">
                Explore Student Path
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Career Transition Path */}
        <motion.div
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          onClick={() => onPathSelect('transition')}
          className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-600/10 border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <HiOutlineRefresh className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Career Transition</h3>
            <p className="text-gray-400">Transform your existing experience into a rewarding tech career with personalized guidance</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Skill mapping
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Learning paths
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Career roadmap
              </li>
            </ul>
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 text-emerald-400 font-medium">
                Start Transition
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto">
            <HiOutlineLightningBolt className="w-5 h-5 text-blue-400" />
          </div>
          <h4 className="font-medium text-white">AI-Powered Matching</h4>
          <p className="text-sm text-gray-400">Smart algorithms to find your perfect role</p>
        </div>
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto">
            <HiOutlineAcademicCap className="w-5 h-5 text-purple-400" />
          </div>
          <h4 className="font-medium text-white">Learning Resources</h4>
          <p className="text-sm text-gray-400">Curated content to build your skills</p>
        </div>
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mx-auto">
            <HiOutlineRefresh className="w-5 h-5 text-emerald-400" />
          </div>
          <h4 className="font-medium text-white">Career Support</h4>
          <p className="text-sm text-gray-400">Guidance throughout your journey</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingHero;
