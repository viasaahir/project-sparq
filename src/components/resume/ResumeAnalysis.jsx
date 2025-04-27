import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineDocumentSearch, HiOutlineClipboardCheck, HiOutlineChartBar } from 'react-icons/hi';

const MatchedJob = ({ job, matchScore }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company}</p>
      </div>
      <div className="flex items-center space-x-1">
        <div className={`h-2 w-16 rounded-full overflow-hidden bg-gray-200`}>
          <div
            className="h-full bg-indigo-600 transition-all duration-1000"
            style={{ width: `${matchScore}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-600">{matchScore}%</span>
      </div>
    </div>
  </motion.div>
);

const Suggestion = ({ title, description, priority }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500"
  >
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <HiOutlineLightBulb className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

const ResumeAnalysis = ({ resumeData }) => {
  // This would come from your AI analysis
  const mockData = {
    matchedJobs: [
      { title: 'Senior Frontend Developer', company: 'TechCorp', matchScore: 95 },
      { title: 'Full Stack Engineer', company: 'StartupX', matchScore: 88 },
      { title: 'React Developer', company: 'InnovateLabs', matchScore: 82 }
    ],
    suggestions: [
      {
        title: 'Highlight Technical Skills',
        description: 'Add specific versions of technologies you\'ve worked with (e.g., "React 18" instead of just "React")',
        priority: 'high'
      },
      {
        title: 'Quantify Achievements',
        description: 'Include metrics for your projects, such as "Improved load time by 40%" or "Served 100K+ users"',
        priority: 'medium'
      },
      {
        title: 'Add Leadership Experience',
        description: 'Emphasize team leadership and mentoring experiences to align with senior roles',
        priority: 'low'
      }
    ],
    skills: {
      technical: ['React', 'TypeScript', 'Node.js'],
      soft: ['Leadership', 'Communication', 'Problem Solving']
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Job Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <HiOutlineChartBar className="w-6 h-6 text-indigo-600" />
              <span>Best Job Matches</span>
            </h2>
            <div className="space-y-3">
              {mockData.matchedJobs.map((job, index) => (
                <MatchedJob
                  key={index}
                  job={job}
                  matchScore={job.matchScore}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <HiOutlineDocumentSearch className="w-6 h-6 text-indigo-600" />
              <span>Skills Analysis</span>
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockData.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockData.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <HiOutlineLightBulb className="w-6 h-6 text-indigo-600" />
            <span>Resume Suggestions</span>
          </h2>
          <div className="space-y-4">
            {mockData.suggestions.map((suggestion, index) => (
              <Suggestion
                key={index}
                title={suggestion.title}
                description={suggestion.description}
                priority={suggestion.priority}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
