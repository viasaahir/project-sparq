import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { HiOutlineUpload, HiOutlineLightningBolt, HiOutlineDocumentSearch, HiOutlineClipboardCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ResumeUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [isHovering, setIsHovering] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState([
    { icon: HiOutlineLightningBolt, title: 'Processing Resume', status: 'pending' },
    { icon: HiOutlineDocumentSearch, title: 'Extracting Skills', status: 'pending' },
    { icon: HiOutlineClipboardCheck, title: 'Generating Recommendations', status: 'pending' }
  ]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('analyzing');
        simulateAnalysis();
      }, 1500);
    }
  }, []);

  const simulateAnalysis = () => {
    setTimeout(() => {
      setAnalysisSteps(steps => steps.map((step, i) => 
        i === 0 ? { ...step, status: 'processing' } : step
      ));
    }, 1000);

    setTimeout(() => {
      setAnalysisSteps(steps => steps.map((step, i) => 
        i === 0 ? { ...step, status: 'complete' } : 
        i === 1 ? { ...step, status: 'processing' } : step
      ));
    }, 3000);

    setTimeout(() => {
      setAnalysisSteps(steps => steps.map((step, i) => 
        i <= 1 ? { ...step, status: 'complete' } : 
        i === 2 ? { ...step, status: 'processing' } : step
      ));
    }, 5000);

    setTimeout(() => {
      setAnalysisSteps(steps => steps.map(step => ({ ...step, status: 'complete' })));
      setUploadStatus('complete');
      if (onUploadComplete) {
        onUploadComplete();
      }
    }, 6000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
    onDropAccepted: () => setIsHovering(false)
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-primary-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to RoleArc
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Get personalized job matches by uploading your resume
          </p>
        </motion.div>

        {/* Upload Area */}
        <div className="relative">
          <motion.div
            {...getRootProps()}
            className={`
              relative rounded-xl border-2 border-dashed p-12 text-center
              ${isDragActive ? 'border-indigo-400 bg-indigo-400/10' : 'border-gray-600 hover:border-indigo-500'}
              ${file ? 'border-green-500 bg-green-50/10' : ''}
              transition-colors cursor-pointer
            `}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input {...getInputProps()} />
            
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-16 h-16 border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center"
                  animate={isHovering ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <HiOutlineUpload className="w-8 h-8 text-indigo-400" />
                </motion.div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">
                    {file ? file.name :
                      uploadStatus === 'idle' ? 'Drop your resume here' :
                      uploadStatus === 'uploading' ? 'Uploading...' :
                      uploadStatus === 'analyzing' ? 'Analyzing your resume...' :
                      'Analysis complete!'
                    }
                  </p>
                  <p className="text-sm text-gray-400">
                    Support for PDF, DOC, and DOCX files
                  </p>
                </div>
              </div>

              {/* Analysis Steps */}
              {file && (
                <motion.div 
                  className="mt-8 space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {analysisSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-center justify-center gap-3 text-gray-300"
                    >
                      <step.icon className={`w-5 h-5 ${
                        step.status === 'complete' ? 'text-green-400' :
                        step.status === 'processing' ? 'text-indigo-400 animate-pulse' :
                        'text-gray-500'
                      }`} />
                      <span>{step.title}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Upload Progress Indicator */}
            {uploadStatus !== 'idle' && (
              <motion.div
                className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: uploadStatus === 'complete' ? 1 : [0, 0.5, 0.8] }}
                transition={{ duration: uploadStatus === 'complete' ? 0.5 : 2, repeat: uploadStatus === 'complete' ? 0 : Infinity }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
