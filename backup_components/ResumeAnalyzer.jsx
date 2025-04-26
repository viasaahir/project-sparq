import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeUpload from './ResumeUpload';

const SkillTag = ({ skill, onRemove, onConfirm, isConfirmed }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 ${
      isConfirmed
        ? 'bg-green-100 text-green-800'
        : 'bg-indigo-100 text-indigo-800'
    }`}
  >
    <span>{skill}</span>
    <button
      onClick={() => (isConfirmed ? onRemove(skill) : onConfirm(skill))}
      className="ml-2 focus:outline-none"
    >
      {isConfirmed ? (
        <svg
          className="w-4 h-4 text-green-600 hover:text-green-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-indigo-600 hover:text-indigo-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  </motion.div>
);

const ResumeAnalyzer = () => {
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [confirmedSkills, setConfirmedSkills] = useState([]);
  const [experience, setExperience] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState([]);

  const handleUpload = async (file) => {
    setIsAnalyzing(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);

      // Send to backend for processing
      const response = await fetch('http://localhost:3001/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      // Update state with extracted information
      setExtractedSkills(data.skills || []);
      setExperience(data.experience || null);
      
      // Find matching jobs based on extracted skills
      await findMatchingJobs(data.skills);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const findMatchingJobs = async (skills) => {
    try {
      const response = await fetch('http://localhost:3001/api/match-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: skills,
          confirmedSkills: confirmedSkills,
          experience: experience,
        }),
      });

      const data = await response.json();
      setMatchedJobs(data.matches || []);
    } catch (error) {
      console.error('Error finding matching jobs:', error);
    }
  };

  const confirmSkill = (skill) => {
    setConfirmedSkills([...confirmedSkills, skill]);
    setExtractedSkills(extractedSkills.filter((s) => s !== skill));
  };

  const removeSkill = (skill) => {
    setConfirmedSkills(confirmedSkills.filter((s) => s !== skill));
  };

  useEffect(() => {
    if (confirmedSkills.length > 0) {
      findMatchingJobs(confirmedSkills);
    }
  }, [confirmedSkills]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Find Your Perfect Role
        </h2>
        <p className="text-lg text-gray-600">
          Upload your resume and we'll match you with roles that fit your skills
          and experience
        </p>
      </div>

      <ResumeUpload onUpload={handleUpload} />

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing your resume...
            </div>
          </motion.div>
        )}

        {extractedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow sm:rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              We found these skills in your resume
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Click to confirm the skills that best represent you
            </p>
            <div className="space-y-4">
              <div>
                {extractedSkills.map((skill) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    onConfirm={confirmSkill}
                    isConfirmed={false}
                  />
                ))}
              </div>
              {confirmedSkills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Confirmed Skills
                  </h4>
                  {confirmedSkills.map((skill) => (
                    <SkillTag
                      key={skill}
                      skill={skill}
                      onRemove={removeSkill}
                      isConfirmed={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {matchedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow sm:rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Matched Jobs
            </h3>
            <div className="space-y-4">
              {matchedJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {job.title}
                      </h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job.matchPercentage}% Match
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{job.description}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                      View Job
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeAnalyzer;
