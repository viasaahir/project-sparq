import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineAcademicCap, HiOutlineTrendingUp } from 'react-icons/hi';
import { analyzeCareerTransition, getRecommendedJobTitles } from '../../services/careerTransitionService';

const CareerTransition = () => {
  const [currentRole, setCurrentRole] = useState('');
  const [skills, setSkills] = useState([]);
  const [transitionPaths, setTransitionPaths] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      const paths = analyzeCareerTransition(currentRole, skills);
      setTransitionPaths(paths);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Career Input Section */}
      <div className="bg-white/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <HiOutlineLightningBolt className="w-6 h-6 text-indigo-400" />
          Discover Your Tech Career Path
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Role
            </label>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="w-full bg-white/10 rounded-lg border border-gray-700 text-white py-2 px-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select your current role</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="Research Scientist">Research Scientist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Skills (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., Patient Care, Data Analysis, Research"
              className="w-full bg-white/10 rounded-lg border border-gray-700 text-white py-2 px-3 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSkills(e.target.value.split(',').map(s => s.trim()))}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!currentRole || analyzing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Career Transitions'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analyzing ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
          />
          <p className="mt-4 text-gray-400">Analyzing your career transition paths...</p>
        </div>
      ) : transitionPaths.length > 0 ? (
        <div className="space-y-6">
          {transitionPaths.map((path, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{path.targetRole}</h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400">
                  {path.matchPercentage.toFixed(0)}% Match
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <HiOutlineTrendingUp className="w-5 h-5" />
                    <span>Transition Time</span>
                  </div>
                  <p className="text-white">{path.timeToTransition}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <HiOutlineAcademicCap className="w-5 h-5" />
                    <span>Avg. Salary</span>
                  </div>
                  <p className="text-white">${path.avgSalary.toLocaleString()}/year</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Skills to Acquire</h4>
                <div className="flex flex-wrap gap-2">
                  {path.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Learning Path</h4>
                <div className="space-y-2">
                  {path.learningPath.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <h5 className="text-white text-sm">{item.skill}</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {item.resources.map((resource, j) => (
                          <div
                            key={j}
                            className="text-xs p-2 rounded bg-white/5 border border-gray-800"
                          >
                            <p className="font-medium text-indigo-400">{resource.name}</p>
                            <p className="text-gray-400">{resource.provider}</p>
                            <div className="flex justify-between text-gray-500 mt-1">
                              <span>{resource.duration}</span>
                              <span>{resource.cost}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CareerTransition;
