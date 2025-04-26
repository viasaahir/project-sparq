import React, { useState } from 'react';
import { CloudArrowUpIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ResumeModule = () => {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // TODO: Implement resume parsing and analysis
      setResume(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!resume ? (
        // Upload Section
        <div className="text-center">
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 space-y-6">
            <div className="mx-auto h-16 w-16 text-gray-400">
              <CloudArrowUpIcon className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">Upload your resume</h3>
              <p className="text-sm text-gray-500">
                Upload your resume to get personalized job recommendations and AI-powered improvements
              </p>
            </div>
            <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer">
              <span>Upload Resume</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
              />
            </label>
          </div>
        </div>
      ) : (
        // Analysis Section
        <div className="space-y-8">
          {/* Resume Preview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{resume.name}</h3>
                  <p className="text-sm text-gray-500">Uploaded just now</p>
                </div>
              </div>
              <button 
                onClick={() => setResume(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Change
              </button>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5 text-primary-500" />
                <span>AI Resume Analysis</span>
              </h3>
              <div className="mt-4 space-y-4">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="p-6">
              <h4 className="text-base font-medium text-gray-900 mb-4">
                Suggested Improvements
              </h4>
              <div className="space-y-4">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Matching Jobs */}
            <div className="p-6">
              <h4 className="text-base font-medium text-gray-900 mb-4">
                Recommended Jobs
              </h4>
              <div className="space-y-4">
                <div className="animate-pulse space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeModule;
