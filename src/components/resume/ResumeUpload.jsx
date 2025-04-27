import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUpload, HiOutlineDocumentText, HiOutlineLightBulb, HiOutlineChartBar, HiOutlineCheckCircle, HiArrowRight } from 'react-icons/hi';

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = async (file) => {
    setIsAnalyzing(true);
    // Simulated analysis - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysis({
      keySkills: [
        'React.js',
        'Node.js',
        'Python',
        'Data Analysis',
        'Project Management'
      ],
      recommendations: [
        'Add quantifiable achievements to highlight impact',
        'Include specific examples of leadership experience',
        'Enhance technical skills section with proficiency levels',
        'Add relevant certifications section'
      ],
      strengths: [
        'Strong technical background',
        'Clear project descriptions',
        'Good education section'
      ],
      improvements: [
        'Work experience could be more detailed',
        'Missing relevant keywords for target roles',
        'Professional summary needs focus'
      ]
    });
    setIsAnalyzing(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      await analyzeResume(uploadedFile);
    }
  });

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Resume</h1>
          <p className="text-xl text-gray-300">
            Get instant insights and recommendations to improve your job search
          </p>
        </motion.div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`
            relative rounded-xl p-12 text-center cursor-pointer
            ${isDragActive ? 'bg-indigo-500/10' : 'bg-[#0a1120]/50 hover:bg-[#0a1120]/70'}
            transition-all duration-200
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-indigo-500/20">
                <HiOutlineUpload className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-white">
                  {file ? file.name : 'Drag & drop your resume here'}
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  Supports PDF, DOC, and DOCX files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 rounded-lg bg-[#0a1120]/50"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-400" />
                <p className="text-white">Analyzing your resume...</p>
              </div>
            </motion.div>
          )}

          {analysis && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 space-y-6"
            >
              {/* Key Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg bg-[#0a1120]/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <HiOutlineDocumentText className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-xl font-semibold text-white">Key Skills Identified</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.keySkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-lg bg-[#0a1120]/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <HiOutlineLightBulb className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-xl font-semibold text-white">Recommendations</h2>
                </div>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2 text-gray-300">
                      <HiOutlineCheckCircle className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Strengths & Improvements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="p-6 rounded-lg bg-[#0a1120]/50">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineChartBar className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-semibold text-white">Strengths</h2>
                  </div>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength) => (
                      <li key={strength} className="text-gray-300 flex items-center gap-2">
                        <HiOutlineCheckCircle className="w-4 h-4 text-green-400" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-[#0a1120]/50">
                  <div className="flex items-center gap-3 mb-4">
                    <HiOutlineChartBar className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-white">Areas for Improvement</h2>
                  </div>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement) => (
                      <li key={improvement} className="text-gray-300 flex items-center gap-2">
                        <HiOutlineCheckCircle className="w-4 h-4 text-yellow-400" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* View Jobs Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center pt-8"
              >
                <button
                  onClick={() => navigate('/jobs')}
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors group"
                >
                  View Matching Jobs
                  <HiArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeUpload;
