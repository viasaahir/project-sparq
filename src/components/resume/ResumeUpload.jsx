import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiCheck, FiLoader } from 'react-icons/fi';
import { HiOutlineLightningBolt, HiOutlineDocumentSearch, HiOutlineClipboardCheck } from 'react-icons/hi';

const AnalysisStep = ({ icon: Icon, title, status }) => (
  <motion.div
    className={`flex items-center space-x-3 ${
      status === 'complete' ? 'text-green-600' :
      status === 'processing' ? 'text-indigo-600' :
      'text-gray-400'
    }`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className="flex-shrink-0">
      {status === 'complete' ? (
        <FiCheck className="w-5 h-5" />
      ) : status === 'processing' ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader className="w-5 h-5" />
        </motion.div>
      ) : (
        <Icon className="w-5 h-5" />
      )}
    </div>
    <span className="text-sm font-medium">{title}</span>
  </motion.div>
);

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [analysisSteps, setAnalysisSteps] = useState([
    { icon: HiOutlineDocumentSearch, title: 'Extracting Skills & Experience', status: 'pending' },
    { icon: HiOutlineLightningBolt, title: 'Finding Job Matches', status: 'pending' },
    { icon: HiOutlineClipboardCheck, title: 'Generating Recommendations', status: 'pending' }
  ]);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      simulateAnalysis();
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const simulateAnalysis = () => {
    // Simulate the analysis process with delays
    setAnalysisSteps(steps => steps.map((step, i) => 
      i === 0 ? { ...step, status: 'processing' } : step
    ));

    setTimeout(() => {
      setAnalysisSteps(steps => steps.map((step, i) => 
        i === 0 ? { ...step, status: 'complete' } :
        i === 1 ? { ...step, status: 'processing' } : step
      ));
    }, 2000);

    setTimeout(() => {
      setAnalysisSteps(steps => steps.map((step, i) => 
        i === 1 ? { ...step, status: 'complete' } :
        i === 2 ? { ...step, status: 'processing' } : step
      ));
    }, 4000);

    setTimeout(() => {
      setAnalysisSteps(steps => steps.map(step => ({ ...step, status: 'complete' })));
      // Here we would navigate to the results page
    }, 6000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          We'll analyze your resume and find the best matching opportunities
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${file ? 'border-green-500 bg-green-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 text-green-600">
              <FiFile className="w-8 h-8" />
              <span className="font-medium">{file.name}</span>
            </div>
            
            <div className="space-y-3">
              {analysisSteps.map((step, index) => (
                <AnalysisStep
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  status={step.status}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <FiUpload className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your resume here, or <span className="text-indigo-600">browse</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PDF, DOC, DOCX (up to 10MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeUpload;
